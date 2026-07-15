# Enterprise Codex Guide Rebrand Design

## Goal

Turn the downloaded CodexGuide VuePress site into a compliant, enterprise-style Codex tutorial site for the private GitHub repository `Lukanytsu7551/how-to-use-codex-`.

## Scope

- Keep the VuePress 2 and `vuepress-theme-hope` technical foundation.
- Replace public-facing project identity with `How to Use Codex`.
- Point repository metadata to `https://github.com/Lukanytsu7551/how-to-use-codex-`.
- Remove public sponsorship, WeChat group,公众号, original repository badges, star history, and original operational promotion copy.
- Remove external image dependencies on the original CDN in site configuration and README.
- Keep MIT license text with the original copyright notice required by the license.
- Add a short `NOTICE` file documenting that this project is a modified version of CodexGuide.
- Prepare for GitHub Pages publishing under `https://lukanytsu7551.github.io/how-to-use-codex-/` unless a custom domain is provided later.

## Architecture

The site remains a static VuePress documentation site. Branding and deployment metadata live in VuePress configuration files under `docs/.vuepress`; homepage and README copy are handled in Markdown. Compliance information is centralized in `LICENSE` and `NOTICE` rather than displayed as promotional content.

## Content Rules

- Do not remove the original MIT copyright notice.
- Do not present the site as the original `codexguide.ai` project.
- Do not keep third-party sponsor ads or personal community QR codes.
- Keep factual references to OpenAI official docs and third-party tools where they are part of tutorial content.
- Use concise enterprise-oriented copy focused on onboarding, governance, security, workflow, and repeatable practice.

## Verification

- Run a text scan for original operational identifiers: `freestylefly`, `canghecode`, `苍何`, sponsor links, WeChat QR references, and `codexguide.ai`.
- Run `pnpm install` if dependencies are missing.
- Run `pnpm build`.
- Check generated site config and README references point to the private repository and GitHub Pages URL.
