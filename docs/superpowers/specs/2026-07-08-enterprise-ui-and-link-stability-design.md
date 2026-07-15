# Enterprise UI And Link Stability Design

## Goal

Refresh How to Use Codex into a more credible enterprise documentation site while eliminating remaining internal 404 risks on GitHub Pages.

## Visual Direction

The site will use an enterprise product documentation style:

- Deep ink text, quiet surfaces, and restrained borders.
- Indigo and teal accents for navigation, buttons, active states, and section markers.
- No heavy decorative gradients or playful visual language.
- Compact, readable layouts that help readers scan tutorial paths quickly.

## Scope

Update these site surfaces:

- Home page hero, entry sections, tutorial cards, and community/manual calls to action.
- Top navigation, dropdowns, mobile navigation, and sidebar states.
- Document page typography, headings, tables, code blocks, tip/warning containers, image frames, and footer.
- Icon usage in navbar/sidebar/home sections, keeping icon meanings consistent and restrained.
- SEO/base URL utilities where they can produce slashless or root-path URLs.

## Link Stability

The site is deployed under `/how-to-use-codex-/`, so internal links must not assume domain root.

Implementation rules:

- Markdown links should be relative where practical.
- Handwritten HTML links should use relative paths or already-base-prefixed generated routes.
- Static page links should include `.html` when targeting generated article files from raw HTML.
- `siteBase`, `siteUrl`, and URL helpers must preserve the trailing slash for the project root.

## Verification

Before publishing, run:

- `pnpm build`
- A local generated-site scan that checks every `href` and `src` in `docs/.vuepress/dist`.
- A source scan for risky root links such as `href="/start"` and Markdown `](/start`.
- A small online crawl after deploy, scoped to `https://lukanytsu7551.github.io/how-to-use-codex-/`.

Success means:

- Build exits 0.
- Local generated-site scan reports 0 broken local links or assets.
- Online crawl reports no internal links outside `/how-to-use-codex-/` and no 404 pages.
- The UI no longer reads as a one-color green theme and feels like a polished enterprise tutorial site.
