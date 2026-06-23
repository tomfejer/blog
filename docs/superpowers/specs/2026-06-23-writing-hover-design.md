# Writing Underline Design

## Goal

Make Writing links accurately reflect their clickable area and provide direct, restrained hover feedback.

## Interaction

- Only each article title and external-link arrow are clickable.
- Source and description text remain non-interactive.
- Hovering or keyboard-focusing a title draws a 1px underline from left to right over 180ms.
- Moving away or removing focus retracts the underline smoothly.
- No Writing entry changes opacity.
- The underline does not affect layout or text position.
- Hovering non-linked text has no visual effect.

## Implementation

Keep the `Link` wrapped around only the title. Replace the coordinated opacity selectors in `app/global.css` with a pseudo-element on `.writing-title` that scales horizontally from the left edge.

## Verification

- Confirm only titles expose link semantics and open in a new tab.
- Confirm hovering and focusing each title draws the underline from left to right.
- Confirm descriptions, sources, and years do not trigger navigation or animation.
- Check smooth retraction, no layout shift, mobile layout, console output, tests, and production build.
