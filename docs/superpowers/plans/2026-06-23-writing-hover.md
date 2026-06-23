# Writing Underline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep only Writing titles clickable and animate a thin underline when a title is hovered or keyboard-focused.

**Architecture:** Keep the page server-rendered and use a scoped pseudo-element on each title link. Remove the previous row-level opacity hooks and selectors so the interaction affects only the active title.

**Tech Stack:** Next.js 16, React, TypeScript, Tailwind CSS, CSS `:has()`

---

### Task 1: Implement And Verify Animated Underline

**Files:**
- Modify: `app/page.tsx:130-225`
- Modify: `app/global.css`

- [ ] **Step 1: Remove the coordinated fading hooks**

Remove `writing-list`, `writing-item`, and the optional `TimelineRow.className` prop. Preserve the title-only link:

```tsx
<Link
  href={item.href}
  target="_blank"
  rel="noreferrer"
  className="writing-title inline-block"
>
  <h3 className="font-normal leading-[1.5] text-black/90">{item.title} ↗</h3>
</Link>
```

- [ ] **Step 2: Add the animated underline**

Replace the opacity rules in `app/global.css` with:

```css
.writing-title {
  position: relative;
}

.writing-title::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  content: '';
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 180ms ease;
}

.writing-title:is(:hover, :focus-visible)::after {
  transform: scaleX(1);
}
```

- [ ] **Step 3: Run automated verification**

Run `npm test && npm run build && git diff --check`.

Expected: 12 tests pass, the production build succeeds, and the diff check is clean.

- [ ] **Step 4: Validate browser behavior**

At `http://localhost:3000/#writing`, verify title-only link bounds, the 180ms left-to-right underline, smooth retraction, keyboard focus parity, external-tab navigation, no opacity changes, no layout shift, and no console errors.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/global.css docs/superpowers/plans/2026-06-23-writing-hover.md
git commit -m "feat: animate writing title underline"
```
