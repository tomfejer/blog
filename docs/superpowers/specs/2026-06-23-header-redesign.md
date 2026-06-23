# Header Redesign

## Goal

Update the portfolio header to match Figma node `203:327` while preserving the existing page shell and `/for-ai-agents` destination.

## Design

- Remove the circular `TF` avatar.
- Use a compact, text-first identity block at the left.
- Set the name to `Tom Fejér` in Geist Sans, 14px regular, 140% line height, and 90% black.
- Set the subtitle to `Product Designer, NL` in Geist Sans, 14px regular, 180% line height, and 50% black.
- Position the AI-agent link at the top-right of the header.
- Keep the pill 24px high with a `#f6f6f6` background, 12px radius, 8px left padding, 10px right padding, and a 4px icon gap.
- Use the existing 16px terminal asset and Geist Mono for the 10px `For AI Agents` label.
- Preserve accessible link semantics and existing hover feedback.

## Responsive Behavior

The header fills the available page width. The identity block may shrink below its 240px desktop width when necessary, while the AI-agent pill remains visible and collision-free at the upper-right.

## Scope

Only the header markup and its local utility classes in `app/page.tsx` change. The remaining page layout, content, and section rhythm stay unchanged.

## Verification

- Run the test suite and production build.
- Compare the rendered header with the Figma reference on desktop and mobile widths.
- Check for text collision, horizontal overflow, broken navigation, and console errors.
