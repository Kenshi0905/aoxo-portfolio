# aoxo.

My developer portfolio, inspired by the PlayStation 3 XrossMediaBar.

A quiet, full-screen interface for exploring my projects, experience, and interests. Move across categories, browse their entries, and open a game-inspired panel for the details.

## The experience

- A skippable welcome animation with continuous SVG waves and three saved themes.
- Keyboard, mouse, touch, and standard gamepad navigation.
- RPG-inspired detail panels with project credits, technology logos, and a downloadable résumé.
- Original supplied PS3 interface sounds, with a saved mute preference.
- Responsive layouts, keyboard focus management, and reduced-motion support.

Built with React 18, TypeScript, Vite, Radix Dialog, Lucide, and custom CSS. Fonts, images, and audio are served locally. The site needs no backend, database, or API keys.

## Run locally

Use **Node.js 22.12 or newer**. The `.node-version` file selects the Node 22 release line.

```sh
git clone https://github.com/Kenshi0905/aoxo-portfolio.git
cd aoxo-portfolio
npm ci
npm run dev
```

## Checks and production build

```sh
npm run check
npm run preview
```

`check` runs the theme and audio tests, TypeScript validation, the Vite production build, and release-asset checks. The output is written to `dist`. Preview serves that build at `http://127.0.0.1:4173`.

Individual commands are also available: `npm test`, `npm run typecheck`, and `npm run build`.

## Controls

| Input | Action |
| --- | --- |
| Left / right arrows | Change category |
| Up / down arrows | Change entry |
| Enter / X | Open an item |
| Escape / O | Close details or return |
| S | Toggle sound |
| T | Change theme from the main menu |
| ? | Open navigation help |

The on-screen controls are clickable. Click or tap an entry once to select it and again to open it. Swipe horizontally for categories or vertically for entries. On a standard mapped controller, use the D-pad or left stick, cross/A to open, circle/B to return, square/X for sound, and triangle/Y for theme.

Theme and sound preferences stay in the visitor's browser. Browser autoplay rules may require an initial interaction before audio plays. Reduced-motion preferences skip the introduction and stop ambient animations.

## Deploy with Cloudflare Pages

Import this GitHub repository into a new **Cloudflare Pages** project and use:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run check` |
| Output directory | `dist` |
| Root directory | Repository root |
| Node version | From `.node-version` |
| Environment variables | None |

Pages provides a free HTTPS address under `.pages.dev` and rebuilds after pushes to `main`. Choose Git integration when creating the project. See the [Cloudflare deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vite3-project/) for the dashboard steps.

The `public/_headers` file supplies Cloudflare Pages security and cache headers. These headers are applied by the host, not the local Vite preview. The current policy permits only local scripts and connections; adjust it deliberately if adding analytics or an API.

## Project structure

```text
src/app/data/         Portfolio content, links, and organization details
src/app/components/  Interface, waves, and detail panels
src/app/hooks/       Themes, startup, sound, and gamepad input
src/app/lib/         Audio controller and saved preferences
src/styles/          Typography, themes, and responsive layouts
public/              Fonts, sounds, images, résumé, and hosting headers
tests/               Audio and theme regression tests
scripts/             Production asset checks
```

Edit `src/app/data/portfolio.ts` to update content. To replace the résumé, update `public/Ashmit-Avash-Resume.pdf`, change the version in `RESUME_URL`, and update the matching fallback link in `index.html`.

## License and credits

The original application code and documentation are available under the [MIT license](LICENSE).

The résumé, portrait, aoxo. branding, supplied PS3 Rodin fonts, sound recordings, and third-party marks are **excluded from the code's MIT license**. Their credits and applicable licenses are documented in [NOTICE.txt](NOTICE.txt); the Pixelify Sans, Devicon, and Simple Icons license files accompany their assets. Replace personal content and use assets you have rights to when adapting the portfolio.

This is an independent personal project, inspired by the PS3 interface. It is not affiliated with Sony or PlayStation.
