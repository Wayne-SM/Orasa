# ORASA — Specialty Coffee × Bake House

A static clone of [orasa.in](https://orasa.in/), rebuilt as plain HTML, CSS and JavaScript with all assets self-hosted.

## Pages

| File | Description |
| --- | --- |
| `index.html` | Home page — hero, marquee, showcase carousel, story, visit details |
| `menu.html` | Full menu browser — Drinks / Food / Desserts tabs with expandable categories |

## Run it

Any static file server works:

```powershell
python -m http.server 8000
# http://localhost:8000
```

You can also open `index.html` directly, though browsers block the web manifest over `file://`.

## Structure

```
index.html
menu.html
site.webmanifest
assets/
  styles.css              Original site stylesheet + self-hosted Syncopate font faces
  js/site.js              Carousel, lightbox and menu browser
  data/menu-data.js       Menu items (window.ORASA_MENU) generated from orasa-menu.csv
  data/orasa-menu.csv     Original menu export
  fonts/                  Syncopate 700 (woff2, latin + latin-ext)
  img/                    Logos, icons and Instagram feature images
```

## Behaviour

- Showcase carousel — auto-advances every 4.2 s, pauses on hover/focus, arrow controls, click to enlarge, `Esc` to close, arrow keys to move while enlarged.
- Menu browser — renders all 215 items across 30 categories, grouped and ordered per section; Drinks includes the alternative milk & syrup add-ons.
- Layout — responsive at tablet (`≤1100px`), mobile (`≤800px`) and small mobile (`≤480px`) breakpoints, and honours `prefers-reduced-motion`.

## Notes

- All copy, imagery and menu content belong to ORASA. This clone is for reference/development use.
- Prices are present in `assets/data/menu-data.js` but not displayed, matching the live site while its menu is under review. Add price markup in `site.js` (`buildCategory`) to show them.
