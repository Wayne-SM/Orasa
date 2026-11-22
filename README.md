# ORASA — Specialty Coffee × Bake House

A static website for Orasa, an all-vegetarian specialty coffee and bake house in Hyderabad. Built from scratch with plain HTML, CSS, and JavaScript, with all assets self-hosted.

## Project Objectives

As defined by the client:

- **Online presence & brand storytelling** — A home page that introduces Orasa's concept ("Coffee with character. A bake house with soul."), shares the house story, and conveys the all-vegetarian, slow-afternoon vibe.
- **Menu discovery** — A browsable menu so customers can see what drinks, food, and desserts are available before visiting. Items grouped logically (Drinks / Food / Desserts) with expandable categories.
- **Drive foot traffic** — Clear hours, address, click-to-call, Instagram link, and Google Maps directions so locals can find and visit the physical café.
- **Mobile-first experience** — Most customers will open the site on a phone. The site loads fast and reads well on small screens.
- **Installable as a web app** — Regular customers can "install" the site on their home screen and open it like an app (standalone mode, theme colours, icons).
- **Low maintenance, no backend** — A static site that can be hosted cheaply or for free; no server, database, or CMS to manage.
- **Accessibility** — Usable by screen readers and keyboard-only navigation; respects `prefers-reduced-motion`.

## Pages

| File | Description |
| --- | --- |
| `index.html` | Home page — hero, marquee, showcase carousel, story, visit details |
| `menu.html` | Full menu browser — Drinks / Food / Desserts tabs with expandable categories |

## Technologies Used

- **HTML5** — Semantic markup (`header`, `nav`, `main`, `section`, `footer`, `details`/`summary`)
- **CSS3** — Vanilla CSS with custom properties (`@layer theme`), `@layer base` resets, Flexbox/Grid layouts, responsive media queries (tablet ≤1100px, mobile ≤800px, small mobile ≤480px), and `prefers-reduced-motion` support
- **JavaScript (Vanilla)** — Single IIFE, no frameworks or build tools; powers the carousel, lightbox, menu browser, and tab switching
- **Menu Data** — CSV source (`orasa-menu.csv`, 215 items) converted to `menu-data.js` exposing `window.ORASA_MENU`
- **Fonts** — Self-hosted Syncopate 700 (woff2, latin + latin-ext)
- **Assets** — Self-hosted images (PNG/JPG), SVG icons, favicon, and Apple touch icon
- **PWA** — Web App Manifest (`site.webmanifest`) with `display: standalone`, theme colour, background colour, and icons
- **Deployment** — Static file server only (tested with `python -m http.server 8000`); deployable to GitHub Pages, Netlify, Vercel, or any static host

## Features / Outcomes

**Home page (`index.html`)**
- Hero section with brand headline, sub-headline, and "Explore the menu" call-to-action
- Scrolling marquee of brand values
- "Now at Orasa" showcase carousel of featured dishes and drinks
- Brand story section
- Visit section: opening hours, full address, Google Maps link, phone number, Instagram link

**Menu page (`menu.html`)**
- Tabbed browser: Drinks / Food / Desserts
- Renders all 215 menu items across 30 categories
- Each category in an expandable accordion (`<details>`/`<summary>`)
- Categories ordered logically per section
- "Alternative Milk & Syrups" add-ons section (10 add-ons)

**Interactive components**
- Auto-advancing carousel (4.2 s), pauses on hover/focus, prev/next arrows, click-to-enlarge lightbox, arrow-key navigation in lightbox, `Esc` to close, focus returns on close
- Accessible lightbox (`role="dialog"`, `aria-modal`, focus trapping, body scroll lock)
- Responsive layout at three breakpoints plus reduced-motion support

## Project Structure

```
index.html
menu.html
site.webmanifest
assets/
  styles.css              Stylesheet + self-hosted Syncopate font faces
  js/site.js              Carousel, lightbox and menu browser
  data/menu-data.js       Menu items (window.ORASA_MENU) generated from orasa-menu.csv
  data/orasa-menu.csv     Original menu export
  fonts/                  Syncopate 700 (woff2, latin + latin-ext)
  img/                    Logos, icons and Instagram feature images
```

## Run it

Any static file server works:

```powershell
python -m http.server 8000
# http://localhost:8000
```

You can also open `index.html` directly, though browsers block the web manifest over `file://`.

## Notes

- All copy, imagery and menu content belong to ORASA. This repository is for reference/development use.
- Prices are present in `assets/data/menu-data.js` but not displayed, matching the live site while its menu is under review. Add price markup in `site.js` (`buildCategory`) to show them.
