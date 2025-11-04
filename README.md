# Av-Global-Path

Simple static site for AV Global Path (local preview and recent updates).

How to preview locally

1. Open a terminal in the project folder (e:\Downloads\Av-Global-Path).
2. If you have Python 3, run:

```powershell
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Or with Node (no install required):

```powershell
npx http-server -p 8000
# then open http://localhost:8000
```

Recent changes made

- Improved accessibility: added a "Skip to main content" link and keyboard-focus styles.
- Converted slider arrows and dots to accessible buttons and added keyboard navigation.
- Added hero overlay, CTA buttons, and improved navbar visuals.
- Lazy-loaded non-critical images for faster initial paint.
- Social links now open in a new tab securely (rel="noopener noreferrer").
- Contact form still uses mailto but UX was improved with a success message.

If you'd like additional changes (different color palette, contact form backend, or accessibility audit), tell me which and I'll implement them.

