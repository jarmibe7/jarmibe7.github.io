# Project: Personal Robotics Portfolio Website

## Goal
Rebuild my personal portfolio from scratch, replacing the current
Jekyll-based (al-folio) site. Keep the same set of pages as the old
site, but as simple, separate static files instead of a Jekyll
collection/templating system.

## Style reference
There is a reference-style/ folder in this workspace containing my
project kld_visualizer (styles.css, app.js, index.html). Read these
files directly and match their visual style: layout conventions, color
palette, typography, spacing, and overall aesthetic. Adapt this style
with added robotics theming (see Design direction below) rather than
copying it verbatim — this is a portfolio, not a data visualizer, so
adjust the structure accordingly while keeping the same visual DNA.

## Hard technical constraints
- Vanilla HTML, CSS, and JavaScript only. No build step, no bundler, no
  npm dependencies requiring compilation (no React/Vue/webpack/Vite).
- If a JS library is needed (e.g. Three.js for a 3D element), load it
  via CDN <script> tag only — never via npm/import requiring a build.
- Must run correctly by opening any .html file directly with the VS
  Code Live Server extension — no server-side code, no environment
  variables, no .env files.
- Must deploy cleanly on GitHub Pages: relative paths only, index.html
  at the repo root, a .nojekyll file at the root (matching the pattern
  in reference-style/), no server-side rendering or backend of any kind.
- Do not introduce Jekyll-style folders (_layouts, _includes, _data,
  etc.) or unnecessary config files (no Gemfile, no Docker, no
  package.json unless a dev-only tool strictly requires it).

## Multi-page structure
Build each page as its own separate .html file, linked via normal
<a href="..."> navigation — no client-side router, no framework.
Pages needed (same set as the old site):
  - index.html        (home)
  - cv.html
  - projects.html
  - publications.html
  - blog.html          (if the old site's content includes posts)
All pages share:
  - css/style.css      (single shared stylesheet)
  - js/main.js         (single shared script)
  - A consistent nav bar/header and footer, hand-copied into each page
    (no shared-template tooling needed at this scale — if it becomes
    annoying to maintain later, that's a fine future improvement, not
    a requirement now).

## File structure
/
├── index.html
├── cv.html
├── projects.html
├── publications.html
├── blog.html
├── .nojekyll
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   └── resume.pdf
└── README.md

## Design direction
- Visual DNA: match reference-style/ (read the actual files, not just
  this description) — likely a clean, minimal, technical/scientific
  aesthetic given the source project.
- Add robotics theming on top: machine learning, computer vision, RL motifs, monospace/     technical accent fonts for headings, restrained
  +accent color (e.g. electric blue or amber) against a dark base.
- Make it interactive, not just animated on load: hover states on
  project cards, scroll-triggered reveals, and at least one standout
  centerpiece interaction (e.g. an animated/rotatable robot arm or
  simple 3D model via Three.js, or an interactive schematic diagram)
  on the home page.
- Fully responsive: mobile, tablet, desktop.
- Keep it performant — lazy-load images, keep JS libraries minimal,
  avoid anything that tanks Lighthouse mobile scores.

## Content
Use the personal info, project descriptions, CV/publication data, and
assets already present in this branch. Do not invent projects,
experience, or credentials — pull only from what's provided in the
existing files/assets. If content is missing for a section, leave a
clear placeholder comment rather than fabricating details.

## Deliverable
A complete, working multi-page static site I can open with Live Server
and see exactly as it will appear on jarmibe7.github.io once pushed to
the main branch's root.