"""Original colorful liver demo on a light green presentation background."""
from pathlib import Path
from functools import lru_cache
import gzip, struct, json, math, subprocess, wave, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from scipy import ndimage

ROOT = Path(__file__).parent
ASSETS = ROOT / 'video_assets'
OUT = ROOT / 'segmentacion_hepatica_Fabricio_Velez.mp4'
W, H, FPS, SECONDS = 1920, 1080, 30, 20
INK, MUTED, GREEN = '#18382d', '#587266', '#5a8968'
WHITE, CYAN = '#f3f6fc', '#4dd0e1'
CANVAS, SURFACE, BORDER = '#e3eddf', '#0d131f', '#9aaa9e'
# The green theme belongs to the presentation, not the medical labels.
# Restore the exact original display colors of the uploaded predictions.
PALETTE = {int(k):v for k,v in json.loads((ASSETS/'metadata.json').read_text())['colores_por_etiqueta'].items()}
FONT = '/usr/share/fonts/opentype/urw-base35/NimbusSans-Regular.otf'
BOLD = '/usr/share/fonts/opentype/urw-base35/NimbusSans-Bold.otf'
MONO = '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'

def rgb(c): return tuple(int(c[i:i+2],16) for i in (1,3,5))
def ease(x): x=float(np.clip(x,0,1)); return 1-(1-x)**3
def smooth(x): x=float(np.clip(x,0,1)); return x*x*(3-2*x)
@lru_cache(None)
def font(s, bold=False, mono=False): return ImageFont.truetype(MONO if mono else BOLD if bold else FONT, s)
def text(im, xy, s, size=28, color=INK, bold=False, anchor=None, mono=False):
    ImageDraw.Draw(im).text(xy, s, font=font(size,bold,mono), fill=color, anchor=anchor, spacing=13)
def line(im, points, color, width=2): ImageDraw.Draw(im).line(points, fill=color, width=width)
def paste(im, layer, xy, alpha=1):
    if alpha<1:
        layer=layer.copy(); layer.putalpha(layer.getchannel('A').point(lambda a:int(a*alpha)))
    im.alpha_composite(layer,(int(xy[0]),int(xy[1])))

# This reader is restricted to the supplied single-file NIfTI-1 float32 volumes.
# The independent PNG and metadata checks below confirm orientation and values.
def volume(name):
    with gzip.open(ASSETS/'volumenes'/name,'rb') as f: data=f.read()
    e='<' if struct.unpack_from('<i',data)[0]==348 else '>'
    assert struct.unpack_from(e+'i',data)[0]==348 and data[344:348]==b'n+1\x00'
    dims=struct.unpack_from(e+'8h',data,40); shape=dims[1:1+dims[0]]
    assert shape==(512,512,66) and struct.unpack_from(e+'h',data,70)[0]==16
    offset=int(struct.unpack_from(e+'f',data,108)[0])
    arr=np.frombuffer(data,dtype=np.dtype(e+'f4'),count=math.prod(shape),offset=offset).reshape(shape,order='F')
    slope,inter=struct.unpack_from(e+'2f',data,112)
    if slope!=0 and (slope!=1 or inter!=0): arr=arr*slope+inter
    affine=np.array([struct.unpack_from(e+'4f',data,280+16*i) for i in range(3)]+[(0,0,0,1)])
    return arr,affine

ct,aff=volume('tomografia.nii.gz')
liv,aff2=volume('pred_higado.nii.gz')
seg,aff3=volume('pred_segmentos.nii.gz')
assert np.array_equal(aff,aff2) and np.array_equal(aff,aff3)
assert set(np.unique(liv))=={0,1} and set(np.unique(seg))==set(range(9))
assert np.count_nonzero((seg>0)&(liv==0))==0
raw45=np.rint(np.clip((ct[:,:,45].T[::-1,::-1]+50)/230,0,1)*255).astype('uint8')
check=Image.fromarray(raw45).convert('RGB').resize((768,768),Image.Resampling.BILINEAR)
assert np.array_equal(np.asarray(check),np.asarray(Image.open(ASSETS/'01_tomografia/corte_0045.png')))
print('Verified native NIfTI geometry, all 8 labels, containment, and CT/PNG orientation.',flush=True)

@lru_cache(500)
def frame_image(group,z,size):
    return Image.open(ASSETS/group/f'corte_{int(z):04d}.png').convert('RGBA').resize((size,size),Image.Resampling.LANCZOS)

def card(im, image, cx, cy, size, border=BORDER):
    x,y=int(cx-size/2),int(cy-size/2)
    d=ImageDraw.Draw(im)
    d.rounded_rectangle((x-8,y-8,x+size+8,y+size+8),radius=16,fill=SURFACE,outline=border,width=1)
    paste(im,image,(x,y))

def arrow(im,a,b,color=GREEN,t=0):
    line(im,[a,b],color,3)
    x,y=b; ImageDraw.Draw(im).polygon([(x,y),(x-13,y-7),(x-13,y+7)],fill=color)
    q=(t*.65)%1; px=a[0]+(b[0]-a[0])*q;py=a[1]+(b[1]-a[1])*q
    ImageDraw.Draw(im).ellipse((px-5,py-5,px+5,py+5),fill=INK)

# True native label-volume boundary, sampled at ~3 mm in XY for a smooth 3D view.
mask=liv[::3,::3,:]>0
surface=mask & ~ndimage.binary_erosion(mask)
idx=np.array(np.nonzero(surface)).T
spacing=np.array([aff[0,0]*3,aff[1,1]*3,aff[2,2]])
pts=idx*spacing; pts-=pts.mean(axis=0)
grad=np.array(np.gradient(ndimage.gaussian_filter(mask.astype(float),1),*spacing))
normals=-grad[:,idx[:,0],idx[:,1],idx[:,2]].T
normals/=np.maximum(np.linalg.norm(normals,axis=1,keepdims=True),1e-9)
labels=seg[::3,::3,:][tuple(idx.T)].astype(int)
colors=np.array([rgb(PALETTE.get(int(c),'#93a5bb')) for c in labels],float)
print('Native 3D boundary points:',len(pts),flush=True)

@lru_cache(160)
def liver3d(index,colored=False):
    size=600; yaw=math.radians(-38+index*.55);pitch=math.radians(16)
    c,s=math.cos(yaw),math.sin(yaw); cp,sp=math.cos(pitch),math.sin(pitch)
    matrix=np.array([[c,-s,0],[s*sp,c*sp,cp],[s*cp,c*cp,-sp]])
    p=pts@matrix.T; n=normals@matrix.T
    scale=2.05
    x=np.rint(p[:,0]*scale+size/2).astype(int)
    y=np.rint(-p[:,1]*scale+size/2).astype(int)
    shade=.52+.48*np.maximum(0,n@np.array([-.4,.6,.7]))
    col=colors if colored else np.tile(np.array(rgb(CYAN)),(len(pts),1))
    col=np.clip(col*shade[:,None]+np.maximum(n[:,2:3],0)*16,0,255).astype('uint8')
    im=Image.new('RGBA',(size,size));d=ImageDraw.Draw(im)
    for j in np.argsort(p[:,2]):
        xx,yy=int(x[j]),int(y[j])
        d.ellipse((xx-4,yy-4,xx+4,yy+4),fill=(*map(int,col[j]),255))
    return im

yy,xx=np.mgrid[0:H,0:W]
glow=np.exp(-(((xx-1320)/830)**2+((yy-580)/590)**2))
base=np.zeros((H,W,4),dtype='uint8');base[:,:,3]=255
for k,(low,hi) in enumerate([(227,11),(237,9),(223,13)]):base[:,:,k]=(low+hi*glow).astype('uint8')
BACKGROUND=Image.fromarray(base)
def background(t,stage=0):
    im=BACKGROUND.copy();d=ImageDraw.Draw(im)
    # Quiet engineering grid; no permanent headers, personal name, or footer labels.
    for x in range(100,1920,120):d.line((x,130,x,940),fill='#dee8da',width=1)
    for y in range(160,941,120):d.line((90,y,1830,y),fill='#dee8da',width=1)
    return im

def cuboid(im,x,y,w,h,color,active=False):
    d=ImageDraw.Draw(im); dx,dy=12,-10
    d.polygon([(x,y),(x+dx,y+dy),(x+w+dx,y+dy),(x+w,y)],fill='#1b3349',outline=color)
    d.polygon([(x+w,y),(x+w+dx,y+dy),(x+w+dx,y+h+dy),(x+w,y+h)],fill='#1c3e57',outline=color)
    d.rectangle((x,y,x+w,y+h),fill='#204659' if active else '#102d3c',outline=color,width=2)
    for k in range(1,4):d.line((x+k*w/4,y+3,x+k*w/4,y+h-3),fill=color,width=1)

def unet(im,t,color=CYAN):
    nodes=[(770,410),(830,493),(890,576),(950,659),(1060,742),(1170,659),(1230,576),(1290,493),(1350,410)]
    sizes=[(37,57),(40,51),(45,45),(51,39),(62,33),(51,39),(45,45),(40,51),(37,57)]
    pulse=(t*2.15)%9
    for i in range(8):
        a=nodes[i];b=nodes[i+1]
        line(im,[(a[0]+15,a[1]+22),(b[0]+15,b[1]+22)],'#456478',3)
        q=np.clip(pulse-i,0,1)
        if 0<q<1:
            px=a[0]+15+(b[0]-a[0])*q;py=a[1]+22+(b[1]-a[1])*q
            ImageDraw.Draw(im).ellipse((px-6,py-6,px+6,py+6),fill=color)
    for i in range(4):
        a=nodes[i];b=nodes[8-i]
        line(im,[(a[0]+53,a[1]+16),(b[0]-18,b[1]+16)],'#9caeaa',2)
    for i,((x,y),(w,h)) in enumerate(zip(nodes,sizes)):
        cuboid(im,x,y,w,h,color,abs(pulse-i)<.7)

maps={}
for prefix in ['higado','couinaud']:
    images=[]
    for layer in ['down1_conv1','down1_conv2','down2_conv2','bottleneck']:
        p=sorted((ASSETS/'06_activaciones_reales').glob(f'{prefix}_{layer}_*.png'))[0]
        images.append(Image.open(p).convert('RGBA').resize((170,170),Image.Resampling.LANCZOS))
    maps[prefix]=images
kernels={prefix:np.load(ASSETS/f'06_activaciones_reales/{prefix}_valores_reales.npz')['kernels_conv1'][0,0,1]
         for prefix in ['higado','couinaud']}
def kernel_panel(im,t,x,y,prefix):
    d=ImageDraw.Draw(im)
    d.rounded_rectangle((x,y,x+226,y+235),radius=15,fill='#122132',outline='#395c70',width=1)
    for r in range(3):
        for c in range(3):
            cx,cy=x+17+c*66,y+25+r*49
            active=(int(t*9)%9)==r*3+c
            d.rounded_rectangle((cx,cy,cx+61,cy+44),radius=5,fill='#225566' if active else '#1b3043')
            text(im,(cx+30,cy+22),f'{kernels[prefix][r,c]:+.2f}',17,WHITE,anchor='mm',mono=True)
    text(im,(x+113,y+205),'Σ (x · w)',26,WHITE,anchor='mm')

def model_scene(t,second=False):
    start=10 if second else 3.1; u=t-start
    im=background(t,2 if second else 1)
    text(im,(95,221),'La segunda red\ndivide el hígado.' if second else 'La red neuronal\nbusca patrones.',71,INK,bold=True)
    size=404
    if second:
        raw=frame_image('01_tomografia',45,size).copy()
        mask=frame_image('04_mascara_higado',45,size).convert('L')
        black=Image.new('RGBA',(size,size),'black');raw=Image.composite(raw,black,mask)
        card(im,raw,313,614,size)
    else:
        raw=frame_image('01_tomografia',45,size).copy()
        d=ImageDraw.Draw(raw);scan=int(135+105*((u*.7)%1))
        d.rectangle((scan,160,scan+24,184),outline=CYAN,width=3)
        d.line((0,scan+70,size,scan+70),fill=CYAN,width=1)
        card(im,raw,313,614,size)
    kernel_panel(im,u,530,528,'couinaud' if second else 'higado')
    arrow(im,(528,439),(768,439),t=u)
    unet(im,u,CYAN)
    arrow(im,(1420,455),(1460,455),t=u)
    prefix='couinaud' if second else 'higado'
    for i,img in enumerate(maps[prefix]):
        x=1490+(i%2)*191;y=461+(i//2)*201
        card(im,img,x+85,y+85,170)
    return im

def intro(t):
    im=background(t,0);u=ease(t/1.2)
    text(im,(98,221),'SEGMENTACIÓN HEPÁTICA',23,GREEN,mono=True)
    text(im,(94,276),'Todo empieza con\nuna tomografía.',83,INK,bold=True)
    size=628;cx=1370+int((1-u)*60);cy=545
    z=int(np.clip(24+t*10,0,65))
    for depth in [5,4,3,2,1]:
        pic=frame_image('01_tomografia',min(z+depth*2,65),size)
        # The stacked, aligned planes represent the 3D volume.
        x=cx-size/2+depth*18;y=cy-size/2-depth*12
        paste(im,pic,(x,y),.13+.065*(6-depth))
        ImageDraw.Draw(im).rectangle((x,y,x+size,y+size),outline=BORDER,width=1)
    card(im,frame_image('01_tomografia',z,size),cx,cy,size)
    return im

def binary_scene(t):
    im=background(t,1);u=t-7.5
    text(im,(96,226),'Primero,\nel hígado.',84,INK,bold=True)
    size=484;raw=frame_image('01_tomografia',45,size).copy()
    overlay=frame_image('02_higado_overlay',45,size)
    cut=int(size*ease(u/1.25));raw.paste(overlay.crop((0,0,cut,size)),(0,0))
    card(im,raw,805,621,size,border=CYAN)
    if 0<cut<size:
        x=805-size/2+cut;line(im,[(x,621-size/2),(x,621+size/2)],WHITE,3)
    mesh=liver3d(int(u*16),False)
    paste(im,mesh,(1220,322),ease(u/.9))
    return im

def finale(t):
    im=background(t,3);u=t-14
    text(im,(96,224),'Un hígado.\nOcho segmentos.',80,INK,bold=True)
    z=int(31+19*smooth(min(u/3,1))) if u<3 else 45
    card(im,frame_image('01_tomografia',z,399),340,660,399)
    arrow(im,(582,660),(659,660),t=u)
    card(im,frame_image('03_segmentos_overlay',z,468),960,651,468,border=CYAN)
    paste(im,liver3d(int(36+u*12),True),(1270,359))
    return im

def scene(t):
    if t<3.1:return intro(t)
    if t<7.5:return model_scene(t)
    if t<10:return binary_scene(t)
    if t<14:return model_scene(t,True)
    return finale(t)
def render(t):
    im=scene(t)
    for boundary in [3.1,7.5,10,14]:
        if boundary-.13<=t<boundary+.13:
            before=scene(boundary-.14);after=scene(boundary+.14)
            im=Image.blend(before,after,smooth((t-boundary+.13)/.26))
            break
    if t<.25:im=Image.blend(Image.new('RGBA',(W,H),CANVAS),im,ease(t/.25))
    return im.convert('RGB')

def soundtrack():
    sr=44100;num=int(sr*SECONDS);t=np.arange(num)/sr;audio=np.zeros(num)
    # Original synthetic music: airy minor pads, a short pentatonic arpeggio and soft drums.
    rng=np.random.default_rng(17)
    for i in range(4):
        a=i*5;b=(i+1)*5;local=np.arange(int(5*sr))/sr
        chords=[(220,261.626,329.628),(174.614,220,261.626),(196,246.942,293.665),(164.814,220,329.628)]
        env=np.minimum(local/.4,1)*np.minimum((5-local)/.5,1)
        pad=sum(np.sin(2*np.pi*f*local)+.25*np.sin(2*np.pi*f*1.002*local) for f in chords[i])*.019*env
        audio[int(a*sr):int(b*sr)]+=pad
    def add(at,values,gain):
        start=int(at*sr);length=min(len(values),num-start)
        if length>0:audio[start:start+length]+=gain*values[:length]
    beat=.625
    for i,at in enumerate(np.arange(0,SECONDS,beat)):
        x=np.arange(int(.22*sr))/sr
        kick=np.sin(2*np.pi*(52*x+1.4*(1-np.exp(-x*40))))*np.exp(-x*23)
        add(at,kick,.12 if i%2==0 else .06)
        h=np.arange(int(.065*sr))/sr; noise=rng.normal(size=len(h));noise=np.r_[0,np.diff(noise)]
        add(at+.3125,noise*np.exp(-h*65),.016)
        x=np.arange(int(.4*sr))/sr;f=[440,523.251,659.255,783.991,659.255,523.251,880,659.255][i%8]
        melody=(np.sin(2*np.pi*f*x)+.22*np.sin(4*np.pi*f*x))*np.minimum(x/.01,1)*np.exp(-x*12)
        add(at,melody,.045)
        if i%4==2:
            x=np.arange(int(.16*sr))/sr
            add(at,rng.normal(size=len(x))*np.exp(-x*35),.038)
    for at in [3.1,7.5,10,14]:
        x=np.arange(int(.45*sr))/sr
        add(at,rng.normal(size=len(x))*np.sin(np.pi*np.arange(len(x))/len(x))**2*np.exp(-x*5),.03)
    audio*=np.minimum(t/.3,1)*np.minimum((SECONDS-t)/.7,1)
    stereo=np.column_stack([audio,.96*audio+.015*np.sin(2*np.pi*220*t)*np.sin(np.pi*t/SECONDS)**2])
    stereo=np.clip(stereo,-.95,.95)
    path=ROOT/'video_music.wav'
    with wave.open(str(path),'wb') as w:
        w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((stereo*32767).astype('<i2').tobytes())
    return path

if '--preview' in sys.argv:
    times=[1.6,5.1,8.6,11.9,16.8,19.2]
    sheet=Image.new('RGB',(1536,1296),'#080d15')
    for i,t in enumerate(times):
        frame=render(t);frame.save(ROOT/f'qa_frame_{i}.jpg',quality=94)
        sheet.paste(frame.resize((768,432),Image.Resampling.LANCZOS),((i%2)*768,(i//2)*432))
    sheet.save(ROOT/'video_storyboard_qa.jpg',quality=96)
else:
    music=soundtrack();log=(ROOT/'ffmpeg_render.log').open('wb')
    cmd=['ffmpeg','-y','-loglevel','warning','-f','rawvideo','-pixel_format','rgb24','-video_size',f'{W}x{H}',
         '-framerate',str(FPS),'-i','pipe:0','-i',str(music),'-c:v','libx264','-preset','fast','-crf','18',
         '-threads','4','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k',
         '-af','loudnorm=I=-19:LRA=7:TP=-1.5','-ar','48000','-shortest','-movflags','+faststart',str(OUT)]
    proc=subprocess.Popen(cmd,stdin=subprocess.PIPE,stderr=log,stdout=subprocess.DEVNULL)
    try:
        for i in range(FPS*SECONDS):
            proc.stdin.write(render(i/FPS).tobytes())
            if i%90==0:print(f'Rendered {i}/{FPS*SECONDS} frames',flush=True)
        proc.stdin.close();code=proc.wait()
        if code:raise RuntimeError((ROOT/'ffmpeg_render.log').read_text())
    except BaseException:
        proc.kill();raise
    finally:log.close()
    print('DONE',OUT,OUT.stat().st_size,flush=True)
