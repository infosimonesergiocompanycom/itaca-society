#!/usr/bin/env bash
# Converte un trailer nel formato per lo sfondo della homepage.
# Uso: scripts/encode-trailer.sh percorso/trailer.mov
# Produce public/video/trailer.mp4 (H.264, 1920px, senza audio), trailer.webm (VP9) e trailer-poster.jpg.
# Poi in data/itacaData.ts imposta:
#   introVideo = { mp4: "/video/trailer.mp4", webm: "/video/trailer.webm", poster: "/video/trailer-poster.jpg" }
set -euo pipefail
src="$1"
out="public/video"
mkdir -p "$out"
# al massimo 30 secondi: il video è un'atmosfera, non il film intero
ffmpeg -y -i "$src" -t 30 -an -vf "scale='min(1920,iw)':-2,fps=25,format=yuv420p" \
  -c:v libx264 -preset slow -crf 26 -profile:v high -movflags +faststart "$out/trailer.mp4"
ffmpeg -y -i "$src" -t 30 -an -vf "scale='min(1920,iw)':-2,fps=25" \
  -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 "$out/trailer.webm"
ffmpeg -y -ss 1 -i "$out/trailer.mp4" -frames:v 1 -q:v 3 "$out/trailer-poster.jpg"
ls -lh "$out"
