#!/usr/bin/env python3
"""Render a static view of the PUBLIC Córdoba fire polygon/detection dataset.

Source repository: https://github.com/velezfabri/Incendios-Cordoba
Public dataset:
https://github.com/velezfabri/Incendios-Cordoba/blob/main/site/data/thermal_matches.json

This is a labeled data visualization, not a screenshot or live satellite map.
The two local equirectangular views have independent scales. All polygons and
all matched detections from the two published events are included unchanged.

Reproduce (Python 3, matplotlib, numpy; fontTools is optional for Manrope):
  python scripts/create-incendios-preview.py \
    --data /path/to/Incendios-Cordoba/site/data/thermal_matches.json

Palette may be adjusted below if the portfolio colors change.
"""

from __future__ import annotations

import argparse
from datetime import date
import json
import math
from pathlib import Path
import tempfile

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties
from matplotlib.patches import PathPatch, Rectangle
from matplotlib.path import Path as PlotPath
import numpy as np


PALETTE = {
    "background": "#eef5ec",
    "ink": "#183a3d",
    "muted": "#52645d",
    "polygon_fill": "#cbded0",
    "polygon_line": "#087665",
    "detection": "#c95921",
    "divider": "#c7d8ca",
}
ROOT = Path(__file__).resolve().parents[1]


def read_events(filename: Path) -> list[dict]:
    dataset = json.loads(filename.read_text(encoding="utf-8"))
    if dataset.get("status") != "validated_polygon_and_time_match":
        raise ValueError("Expected the validated PUBLIC polygon/time match dataset")
    events = dataset.get("events", [])
    if {event["id"] for event in events} != {"el_durazno", "capilla_del_monte"}:
        raise ValueError("Expected both published 2024 Córdoba events")
    for event in events:
        if not event.get("geometries") or not event.get("detections"):
            raise ValueError("Each event must include real geometries and detections")
        for point in event["detections"]:
            if not (event["start_local"] <= point["date_local"] <= event["end_local"]):
                raise ValueError("Detection outside the published time interval")
            if not all(math.isfinite(float(point[key])) for key in ("lon", "lat")):
                raise ValueError("Invalid coordinates")
    return events


def polygons_from_event(event: dict) -> list[list]:
    polygons = []
    for geometry in event["geometries"]:
        if geometry["type"] == "Polygon":
            polygons.append(geometry["coordinates"])
        elif geometry["type"] == "MultiPolygon":
            polygons.extend(geometry["coordinates"])
        else:
            raise ValueError(f"Unsupported geometry: {geometry['type']}")
    return polygons


def ring_signed_area(vertices: np.ndarray) -> float:
    x, y = vertices[:, 0], vertices[:, 1]
    return float(np.sum(x * np.roll(y, -1) - np.roll(x, -1) * y) / 2)


def build_polygon_path(polygon: list, project) -> PlotPath:
    vertices, codes = [], []
    for index, ring in enumerate(polygon):
        xy = project(np.asarray(ring, dtype=float))
        # Preserve GeoJSON holes by using opposite ring winding directions.
        should_be_ccw = index == 0
        if (ring_signed_area(xy) > 0) != should_be_ccw:
            xy = xy[::-1]
        if not np.allclose(xy[0], xy[-1]):
            xy = np.vstack((xy, xy[0]))
        vertices.extend(xy)
        codes.extend([PlotPath.MOVETO] + [PlotPath.LINETO] * (len(xy) - 2) + [PlotPath.CLOSEPOLY])
    return PlotPath(vertices, codes)


def load_fonts(temporary_dir: Path, font_file: Path) -> dict[str, FontProperties]:
    try:
        from fontTools.ttLib import TTFont
        from fontTools.varLib.instancer import instantiateVariableFont

        properties = {}
        for label, weight in (("regular", 450), ("semibold", 650)):
            font = TTFont(font_file)
            if "fvar" in font:
                font = instantiateVariableFont(font, {"wght": weight}, inplace=True)
            font.flavor = None
            output = temporary_dir / f"manrope-{label}.ttf"
            font.save(output)
            properties[label] = FontProperties(fname=str(output))
        return properties
    except (ImportError, FileNotFoundError, OSError):
        return {
            "regular": FontProperties(family="DejaVu Sans"),
            "semibold": FontProperties(family="DejaVu Sans", weight="bold"),
        }


def format_interval(event: dict) -> str:
    start, end = date.fromisoformat(event["start_local"]), date.fromisoformat(event["end_local"])
    return f"{start.day:02d}–{end.day:02d} septiembre {start.year}"


def draw_event_map(ax, event: dict) -> None:
    polygons = polygons_from_event(event)
    coordinates = np.asarray([point for polygon in polygons for ring in polygon for point in ring])
    center = (coordinates.min(axis=0) + coordinates.max(axis=0)) / 2
    # Local equirectangular projection with latitude-dependent longitude scaling.
    # This preserves approximate local geographic proportions without a basemap.
    def project(points):
        delta = points - center
        return delta * np.array([math.cos(math.radians(center[1])), 1])

    for polygon in polygons:
        ax.add_patch(PathPatch(build_polygon_path(polygon, project),
                               facecolor=PALETTE["polygon_fill"],
                               edgecolor=PALETTE["polygon_line"],
                               linewidth=0.85, zorder=1))
    points = project(np.asarray([[point["lon"], point["lat"]] for point in event["detections"]]))
    ax.scatter(points[:, 0], points[:, 1], s=12, color=PALETTE["detection"],
               alpha=0.76, edgecolors="#fff2d8", linewidths=0.22, zorder=2)
    projected = project(coordinates)
    minimum, maximum = projected.min(axis=0), projected.max(axis=0)
    padding = (maximum - minimum).max() * 0.045
    ax.set_xlim(minimum[0] - padding, maximum[0] + padding)
    ax.set_ylim(minimum[1] - padding, maximum[1] + padding)
    ax.set_aspect("equal", adjustable="box")
    ax.axis("off")


def render(events: list[dict], output: Path, font_file: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="fire-preview-fonts-") as directory:
        fonts = load_fonts(Path(directory), font_file)
        figure = plt.figure(figsize=(16, 9), dpi=100, facecolor=PALETTE["background"])
        def text(x, y, value, size=14, emphasis=False, color=None):
            figure.text(x, y, value, fontsize=size,
                        color=color or PALETTE["ink"],
                        fontproperties=fonts["semibold" if emphasis else "regular"],
                        va="center", ha="left")

        text(0.045, 0.953, "CÓRDOBA · 2024", 11, True, PALETTE["polygon_line"])
        text(0.045, 0.891, "Incendios: cruce espacial y temporal", 32, True)
        text(0.045, 0.832, "Polígonos finales IDECOR + detecciones térmicas NASA FIRMS", 16, color=PALETTE["muted"])

        # Independent local scales keep the detailed real boundaries legible.
        for index, event in enumerate(events):
            x = 0.045 if index == 0 else 0.53
            name = "El Durazno / Villa Yacanto" if event["id"] == "el_durazno" else "Capilla del Monte y alrededores"
            text(x, 0.739, name, 18, True)
            text(x, 0.695, f"{format_interval(event)} · {len(event['detections']):,} detecciones".replace(",", "."),
                 12, color=PALETTE["muted"])
            draw_event_map(figure.add_axes([x, 0.214, 0.42, 0.436]), event)

        divider = plt.Line2D([0.498, 0.498], [0.23, 0.754],
                             transform=figure.transFigure, color=PALETTE["divider"], linewidth=0.8)
        figure.add_artist(divider)
        figure.add_artist(Rectangle((0.046, 0.146), 0.014, 0.021,
                                    transform=figure.transFigure,
                                    facecolor=PALETTE["polygon_fill"],
                                    edgecolor=PALETTE["polygon_line"], linewidth=1))
        text(0.069, 0.156, "Área final afectada · IDECOR", 12)
        figure.add_artist(plt.Line2D([0.411], [0.156], marker="o", markersize=6,
                                    linestyle="none", color=PALETTE["detection"], transform=figure.transFigure))
        text(0.428, 0.156, "Detección térmica · VIIRS NOAA-20", 12)
        text(0.045, 0.095, "Primeros cinco días de cada evento · vistas locales con escalas independientes, sin mapa base.",
             11, color=PALETTE["muted"])
        text(0.045, 0.054, "Visualización estática del conjunto publicado. Las detecciones no representan hectáreas ni causas del incendio.",
             10.5, color=PALETTE["muted"])
        figure.savefig(output, dpi=100, facecolor=PALETTE["background"],
                       metadata={"Source": "https://github.com/velezfabri/Incendios-Cordoba/blob/main/site/data/thermal_matches.json",
                                 "Description": "Static data visualization of all real published matched detections and IDECOR polygons; independent local scales."})
        plt.close(figure)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--data", type=Path, required=True, help="Public thermal_matches.json from the source repository")
    parser.add_argument("--output", type=Path, default=ROOT / "public/images/incendios-cruce.png")
    parser.add_argument("--font", type=Path, default=ROOT / "public/fonts/Manrope-Latin.woff2")
    args = parser.parse_args()
    events = read_events(args.data)
    render(events, args.output, args.font)
    print(f"Saved {args.output} · 1600 × 900 · {sum(len(e['detections']) for e in events)} real detections")


if __name__ == "__main__":
    main()
