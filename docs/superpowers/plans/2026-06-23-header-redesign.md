# Header Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current avatar-led portfolio header with the compact text-first header from Figma node `203:327`.

**Architecture:** Keep the change local to the header markup in `app/page.tsx`. Reuse the existing Geist fonts, terminal icon, Next.js link, page shell, and Tailwind utilities; no new component or dependency is warranted.

**Tech Stack:** Next.js 16, React, TypeScript, Tailwind CSS, Geist Sans, Geist Mono

---

### Task 1: Implement And Verify The Header

**Files:**
- Modify: `app/page.tsx:1-105`

- [ ] **Step 1: Replace the existing header markup**

Remove the avatar and use the Figma dimensions and typography:

```tsx
<header className="relative flex min-h-11 w-full items-start">
  <div className="w-60 min-w-0 pr-4 text-sm font-normal">
    <h1 className="leading-[1.4] text-black/90">Tom Fejér</h1>
    <p className="leading-[1.8] text-black/50">Product Designer, NL</p>
  </div>
  <Link
    href="/for-ai-agents"
    className={`${GeistMono.className} absolute right-0 top-0 inline-flex h-6 items-center justify-center gap-1 rounded-xl bg-[#f6f6f6] py-0.5 pl-2 pr-2.5 text-[10px] leading-none text-black/50 transition hover:bg-[#eeeeee] hover:text-black/90`}
  >
    <Image src="/terminal-icon.svg" alt="" width={16} height={16} aria-hidden="true" />
    For AI Agents
  </Link>
</header>
```

- [ ] **Step 2: Run automated verification**

Run:

```bash
npm test
npm run build
```

Expected: all 12 tests pass and the Next.js production build exits successfully.

- [ ] **Step 3: Validate the rendered result**

Open `http://localhost:3000`, compare the header with the Figma reference at desktop and mobile widths, and confirm:

- name and subtitle align at the left;
- the AI-agent pill is pinned to the upper-right;
- no avatar remains;
- no horizontal overflow or text collision occurs;
- `/for-ai-agents` navigation works;
- the console contains no errors.

- [ ] **Step 4: Commit the implementation**

```bash
git add app/page.tsx docs/superpowers/plans/2026-06-23-header-redesign.md
git commit -m "feat: match portfolio header to Figma"
```
