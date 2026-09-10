# Henaco Beverages — website

Single-page sales site for **Henaco Beverages (Nig.) Ltd**, Aba, Abia State.
Built to do one job: turn a visitor into a WhatsApp order.

## Run it locally

```bash
python -m http.server 8321
```

Then open <http://localhost:8321>. It is plain static HTML/CSS/JS — no build step,
no framework. It can be dropped on GitHub Pages, Netlify, cPanel, anywhere.

## Files

```
index.html              the whole page
css/theme.css           design system (brand colours, glass, 3D, responsive)
js/app.js               WhatsApp links, hero vortex, tilt, reveals, demo chat
images/brand/*.webp     Henaco logo mark, lifted off the company banner
                        (blue for light backgrounds, ivory for the footer)
images/products/*.webp  bottles cut out to transparent PNG->WebP
images/scenes/*.webp    the company banner + "Refresh Your Moment" posters
images/raw/             the original phone photos + full-size PNG cutouts
video/hero-vortex.mp4   compressed hero loop (2.7 MB, was 19.8 MB)
video/holetrack.json    tracked vanishing point of the video, for reference
```

## Design

Warm cream ground (taken from the reference studio site) carrying Henaco's own
blue and gold. Sections run **edge to edge with no gaps** — verified: every
inter-section gap measures 0px.

The hero is split: the neon tunnel sits in a dark rounded panel on the **left**,
the pitch sits on the **right**. The flying bottles are clipped inside that panel,
so they can never wash across the copy. Below 1050px the two stack, copy first.

All body text passes WCAG AA contrast (>=4.5:1) on the cream ground.

## The hero animation

The neon video's tunnel mouth **moves around the frame**. I tracked that mouth
out of the video frame-by-frame, and the bottles are animated to fly into it —
so they stay locked to the hole rather than to a fixed point on the screen.

The track lives as the `HOLE` array at the top of `js/app.js`. It is sampled
every `0.083s`. Bottle flight time is `LIFE` (5.2s) and the bottles used are the
`BOTTLES` array — reorder or swap those freely.

**If you ever replace `video/hero-vortex.mp4` with a different clip, the track no
longer matches** and the bottles will fly to the wrong spot. Ask me to re-track it.

It degrades safely: `prefers-reduced-motion` turns the flight off, and visitors on
2G or with Data Saver on never download the video at all — they just get the
poster image.

## Things you should confirm or change

These are the only places I made a judgement call rather than using something
printed on your bottles or that you told me:

| Where | What it says | Check |
|---|---|---|
| FAQ "smallest order" | Deliberately open — routes to WhatsApp | Set a real MOQ if you have one |
| FAQ "how do I pay" | Says confirm on WhatsApp, warns against other accounts | Add real payment terms if you want |
| Marquee / stats | "7 brands", "36+1 states" | Correct if you count differently |
| Table water block | No brand name, no photo — asks people to enquire | **Send me the water name + photos and I'll build it out properly** |
| `og:url` / canonical | `https://www.henacobeverages.com/` | Change if the live domain differs |

**No prices are printed anywhere on purpose** — the site asks people to request the
current list on WhatsApp. That protects you from stale prices, and it gets you the
customer's phone number, which a printed price would not.

## Contact details wired in

Taken from your own company banner:

- **WhatsApp / phone:** +234 806 808 2495 (change `WA_NUMBER` at the top of `js/app.js`)
- **Email:** henacobvltd@yahoo.co.uk
- **Address:** #7 Obuzor Road, Osisioma Industrial Layout, Aba, Abia State

Every button on the page opens WhatsApp with a **different pre-filled message**, so
when someone messages you, you already know which product or which tier they came
from. There are 20 of them.

## Note on the photos

The 7 photos that had the `vivo V50 | ZEISS` camera watermark across the bottom
were cropped before anything else was done. Originals are in `images/raw/`.
