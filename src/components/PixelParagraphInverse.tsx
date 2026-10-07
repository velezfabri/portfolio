// Adapted from Cult UI, Copyright (c) 2023 Jordan-Gilliam, MIT.
// Source and license: THIRD_PARTY.md. Native CSS + self-hosted Geist Pixel.
type Segment = { type: "pixel" | "plain"; text: string };

function splitTextByPlainWords(text: string, plainWords: readonly string[]): Segment[] {
  const sorted = [...plainWords].filter(Boolean).sort((a, b) => b.length - a.length);
  if (!sorted.length) return [{ type: "pixel", text }];
  const escaped = sorted.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "g");
  const segments: Segment[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > lastIndex) segments.push({ type: "pixel", text: text.slice(lastIndex, start) });
    segments.push({ type: "plain", text: match[0] });
    lastIndex = start + match[0].length;
  }
  if (lastIndex < text.length) segments.push({ type: "pixel", text: text.slice(lastIndex) });
  return segments;
}

export function PixelParagraphInverse({
  text,
  plainWords,
}: {
  text: string;
  plainWords: readonly string[];
}) {
  return (
    <>
      <p className="sr-only">{text}</p>
      <p className="pixel-paragraph" aria-hidden="true">
        {splitTextByPlainWords(text, plainWords).map((segment, segmentIndex) => (
          <span className={segment.type === "plain" ? "pixel-plain" : undefined} key={segmentIndex}>
            {segment.text.split(/(\s+)/).map((part, index) => (
              /^\s+$/.test(part) ? part : part && <span className="pixel-word" key={index}>{part}</span>
            ))}
          </span>
        ))}
      </p>
    </>
  );
}
