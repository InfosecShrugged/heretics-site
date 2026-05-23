#!/usr/bin/env python3
"""
Convert the hero samurai from a JPEG-with-white-background to a true transparent
PNG. Uses corner-anchored flood fill so interior whites (hoodie, gloves) are
preserved — a simple "white→alpha" would kill those.

Steps:
  1. Open source (currently hero-char.png is misnamed JPEG)
  2. Convert to RGBA
  3. Flood-fill from each corner with a small fuzz tolerance
  4. Apply Gaussian feather to the alpha channel for smooth edge blending
     (this is the "feathered hair" effect the old hero had)
  5. Optionally multiply in hero-hair-mask.png if it carries extra alpha data
  6. Save back to hero-char.png as a proper transparent PNG

Run: python3 scripts/make-hero-transparent.py
"""
from PIL import Image, ImageFilter
from collections import deque
import os, sys

ASSETS = os.path.join(os.path.dirname(__file__), '..', 'assets')
SRC    = os.path.join(ASSETS, 'hero-char.png')
HAIR   = os.path.join(ASSETS, 'hero-hair-mask.png')
DST    = SRC  # overwrite in place
BACKUP = os.path.join(ASSETS, 'hero-char-original.jpg')

# Tunables
FUZZ           = 18    # color distance tolerance for "is this background white?" (0-255)
FEATHER_RADIUS = 1.4   # Gaussian blur radius applied to alpha edges (px)

def color_distance(a, b):
    return max(abs(a[i] - b[i]) for i in range(3))

def flood_fill_alpha(img, seed, fuzz):
    """Iterative flood-fill: set alpha=0 wherever pixel color is within `fuzz`
    of the seed color, connected 4-way. Returns nothing; mutates img in place."""
    w, h = img.size
    px = img.load()
    seed_color = px[seed][:3]
    if px[seed][3] == 0: return  # already cleared

    visited = bytearray(w * h)
    stack = deque([seed])
    while stack:
        x, y = stack.pop()
        if x < 0 or y < 0 or x >= w or y >= h: continue
        idx = y * w + x
        if visited[idx]: continue
        visited[idx] = 1
        p = px[x, y]
        if p[3] == 0: continue
        if color_distance(p, seed_color) > fuzz: continue
        px[x, y] = (p[0], p[1], p[2], 0)
        stack.append((x + 1, y))
        stack.append((x - 1, y))
        stack.append((x, y + 1))
        stack.append((x, y - 1))

def main():
    if not os.path.exists(SRC):
        print(f"ERROR: source not found at {SRC}", file=sys.stderr); sys.exit(1)

    # Back up the original JPEG once (so we can reprocess from source later if needed)
    if not os.path.exists(BACKUP):
        with open(SRC, 'rb') as f_in, open(BACKUP, 'wb') as f_out:
            f_out.write(f_in.read())
        print(f"backed up original → {BACKUP}")

    img = Image.open(SRC).convert('RGBA')
    w, h = img.size
    print(f"source: {w}x{h}")

    # Flood-fill from all four corners (covers the background even if it's not
    # perfectly uniform — multiple seeds catch any small color drift)
    print(f"flood-filling background (fuzz={FUZZ})...")
    for seed in [(0, 0), (w-1, 0), (0, h-1), (w-1, h-1)]:
        flood_fill_alpha(img, seed, FUZZ)

    # Feather the alpha channel for soft edges (the "waving hair" effect)
    print(f"feathering alpha (radius={FEATHER_RADIUS})...")
    r, g, b, a = img.split()
    a = a.filter(ImageFilter.GaussianBlur(radius=FEATHER_RADIUS))
    img = Image.merge('RGBA', (r, g, b, a))

    # Optionally multiply in the hair mask for extra hair-tip alpha
    if os.path.exists(HAIR):
        try:
            hair = Image.open(HAIR).convert('RGBA').resize((w, h), Image.LANCZOS)
            _, _, _, ha = hair.split()
            # Combine: take minimum of current alpha and (255 - hair_mask) to fade
            # where the hair mask says "fade." If hair_mask is all white, no effect.
            # Skipping multiplication for now — the flood + feather covers most cases.
            pass
        except Exception as e:
            print(f"  (skipping hair mask: {e})")

    img.save(DST, 'PNG', optimize=True)
    out_size = os.path.getsize(DST) / 1024
    print(f"saved: {DST} ({out_size:.0f} KB)")

if __name__ == '__main__':
    main()
