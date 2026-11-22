# SARANG AI — Comprehensive Architecture & Codebase Audit

**Date:** November 15, 2026  
**Auditor:** Principal Software Architect  
**Repository:** SARANG AI Portfolio (`sarang-ai-portfolio@1.0.0`)  
**Stack:** Next.js 14.2 (App Router), React 18, TypeScript 5.6, Tailwind CSS 3.4, Supabase (PostgreSQL), Google Gemini API  

---

## 1. Executive Summary & Scorecard

A full architectural review was performed across the component hierarchy, state contexts, API endpoints, Supabase data access layer, and UI responsiveness layers. 

The application demonstrates strong visual polish, solid TypeScript coverage (zero type errors on build), and resilient offline fallbacks (`localStorage` + mock domain data). However, several iterations of feature evolution (specifically migrating from a modal-based chat experience to an inline tripartite console in Section 5) have left behind dead components, orphaned state, redundant data fetching, and divergent API routes.

### Architecture Health Scorecard

| Domain | Score | Status | Key Focus Area |
| :--- | :---: | :---: | :--- |
| **Component Structure & Modularity** | **78 / 100** | 🟡 Moderate Debt | 471 lines of dead modal code; unused state & redundant DB calls in Section 5 |
| **Supabase & API Efficiency** | **72 / 100** | 🟡 Divergent | `/api/chat` is abandoned while `/api/jnana` uses a generic system prompt; client-side admin auth |
| **Performance & Responsiveness** | **88 / 100** | 🟢 Solid | Fast static builds (22.5 kB page bundle); hardcoded viewport scroll heuristics need minor tuning |
| **Type Safety & Build Integrity** | **95 / 100** | 🟢 Excellent | Strict TypeScript compilation (`tsc --noEmit`), clean production build (`next build`) |

---

## 2. Component Structure & Modularity

### 2.1 Critical Dead Code: `SarangChatModal.tsx` (471 Lines)
- **File:** `src/components/SarangChatModal.tsx`
- **Status:** **Completely Orphaned**
- **Finding:** Following the Section 5 upgrade to an integrated inline console, the popup modal was retired. However, the file remains in the repository. It is never imported, referenced, or rendered by any page or layout.
- **Impact:** Increases repository clutter and cognitive overhead for future maintainers.

### 2.2 Zombie State & Vestigial Modal Methods in `AgentChatContext.tsx`
- **File:** `src/context/AgentChatContext.tsx`
- **Finding:** The context continues to expose state variables designed solely for the retired popup modal:
  - `isChatOpen` / `setIsChatOpen`
  - `closeChat`
  - Redundant alias exports: `handleAgentSelection: openSpecialistChat`, `openSarangChat: openSpecialistChat`, `getAgentIdForProject: resolveAgentId`.
  - `src/components/Navbar.tsx` destructures `isChatOpen` without using it.
- **Impact:** React re-render overhead when unused state variables update; cluttered context API.

### 2.3 Duplicate State & Redundant Supabase DB Fetch in `AgentSection.tsx`
- **File:** `src/components/sections/AgentSection.tsx`
- **Finding:**
  1. Both `ProjectsSection.tsx` and `AgentSection.tsx` invoke `fetchProjectsFromDb()` independently on initial mount.
  2. In `AgentSection.tsx`, the fetched `projects` array is only used to compute `jnanaProjects`.
  3. `jnanaProjects` is **never rendered or referenced anywhere** in `AgentSection.tsx`.
  4. `selectedProject` is declared (`useState<Project | null>(null)`), passed to `<ProjectModal />`, but **never set** to any project inside Section 5 (only `ProjectsSection.tsx` sets projects).
- **Impact:** Redundant network roundtrips to Supabase on home page load, unneeded React reconciliation cycles, and dead component mounting.

### 2.4 Quick Prompts Duplication
- **Finding:** Prompt chips are defined in `AgentSection.tsx` (`QUICK_PROMPTS`), while agent metadata (greetings, badges, placeholders) are located in `AgentChatContext.tsx`. Consolidating all specialist configuration (metadata, greeting, placeholder, and recommended prompts) into a single domain dictionary in `AgentChatContext.tsx` will eliminate cross-file desynchronization.

---

## 3. Supabase & API Efficiency

### 3.1 Route Divergence: Unused `/api/chat` vs Active `/api/jnana`
- **Files:**
  - `src/app/api/chat/route.ts` (152 lines)
  - `src/app/api/jnana/route.ts` (93 lines)
- **Finding:**
  - `AgentSection.tsx` submits messages directly to `/api/jnana` (`fetch('/api/jnana')`).
  - `/api/chat` is **never called by any component** in the codebase.
  - **The Problem:** `/api/chat` contains the comprehensive, 60-line underwriting persona prompt (`OWNER BACKGROUND`, `PORTFOLIO PROJECTS CONTEXT`, `SPECIALIST MODE` prompts, `REGULATORY GUARDRAIL`, and high-fidelity fallback). Conversely, `/api/jnana` streams tokens using a generic system instruction:
    ```typescript
    systemInstruction: 'You are a helpful AI assistant.'
    ```
- **Impact:** Live Gemini responses streamed through Section 5 lack the specialized underwriting persona, ICR rules, and compliance disclaimers present in `/api/chat`.
- **Architectural Fix:** Merge the rich domain prompt from `/api/chat` into `/api/jnana`'s streaming pipeline, and safely retire `/api/chat`.

### 3.2 Direct Client Supabase Calls vs API Route Inconsistency
- **File:** `src/lib/supabaseClient.ts`
- **Finding:**
  - **Contact Form:** Submits to a Next.js server route (`/api/contact`), which performs server-side validation before writing to Supabase.
  - **Reviews Form:** Directly calls `saveSarangReview()` client-side, running `supabase.from('sarang_reviews').insert(...)` using the public `anon` key from the browser.
  - **Projects CMS:** Directly calls `saveProjectToDb()` and `deleteProjectFromDb()` client-side from `/admin`.
- **Impact:** Inconsistent architecture. If Supabase Row Level Security (RLS) is enabled without explicit public `INSERT` policies on `sarang_reviews`, reviews will fail silently and only save to the user's local browser storage.
- **Architectural Fix:** Standardize mutations through Next.js Route Handlers (`/api/reviews`, `/api/projects`) or enforce verified RLS policies.

### 3.3 Admin Authentication Security Boundary
- **Files:**
  - `src/app/admin/page.tsx`
  - `src/app/admin/login/page.tsx`
- **Finding:** Authentication for `/admin` is verified strictly via client-side `sessionStorage.getItem('sarang_admin_auth')`.
- **Risk:**
  - There is no server-side Next.js middleware check (`middleware.ts`).
  - If a visitor manually sets `sessionStorage.setItem('sarang_admin_auth', 'true')` in DevTools, they can view the admin interface.
  - While write operations will fail if Supabase RLS is configured to block unauthorized requests, the admin UI itself is not protected at the edge/server layer.
- **Recommendation:** Implement Next.js `middleware.ts` with encrypted HTTP-only session cookies or Supabase Auth SSR (`@supabase/ssr`).

---

## 4. Performance & UI Responsiveness

### 4.1 Viewport-Aware Scroll Heuristics
- **File:** `src/context/AgentChatContext.tsx`
- **Implementation:**
  ```typescript
  const isAlreadyVisible = rect.top >= 50 && rect.top <= 280;
  if (!isAlreadyVisible) {
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  ```
- **Analysis:**
  - The `rect.top >= 50 && rect.top <= 280` heuristic effectively prevents screen jumps when the user interacts with specialist buttons inside Section 5 on standard 1080p/1440p displays.
  - On compact laptops (e.g. 1366x768) or mobile landscape orientations, `rect.top` may sit slightly outside this range while the chat is still partially in view.
  - Mobile behavior properly falls back to `#sarang-chat` via `window.innerWidth < 1024`.
  - **Refinement:** Use an `IntersectionObserver` or calculate viewport intersection ratio (`rect.top < window.innerHeight * 0.4 && rect.bottom > window.innerHeight * 0.3`) for dynamic responsiveness across all form factors.

### 4.2 Tailwind Layout Density & Text Truncation
- **Specialist Cards (Section 5, line 861):**
  - Uses `grid grid-cols-2 gap-2` with `line-clamp-1` on titles.
  - On screens under 360px wide, long titles (e.g., *"GPA Claims Admissibility & Grievance Helpdesk"*) get truncated to *"GPA Claims..."*.
  - **Recommendation:** Add `sm:grid-cols-2 grid-cols-1` for extra-narrow screens (< 360px) to prevent over-truncation.
- **Double Transform/Isolation Declarations:**
  - In `Navbar.tsx` and `HeroSection.tsx`:
    ```tsx
    style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
    className="... transform-gpu isolate ..."
    ```
  - Both inline CSS and Tailwind GPU utility classes are declared simultaneously. Inline styles can be safely removed in favor of Tailwind classes.

### 4.3 GPU Composite Thread Load
- **Finding:** The page features 7 sections, each rendering multiple high-blur SVG/CSS radial gradient layers (`blur-[130px]`, `blur-[150px]`, `blur-[160px]`).
- **Impact:** While modern desktop GPUs handle this smoothly, low-power mobile GPUs (older Android/iOS devices) can experience composite thread frame drops during rapid scrolling.
- **Optimization:** Reduce blur radius on mobile via `blur-[80px] sm:blur-[140px]` or use CSS `radial-gradient` with opacity stops rather than heavy filter blurs.

---

## 5. Prioritized Action Plan

| Priority | Area | Action | Estimated Effort | Impact |
| :---: | :--- | :--- | :---: | :--- |
| **P0** | **API Sync** | Transfer rich domain persona & fallback logic from `/api/chat` to `/api/jnana`, then remove `/api/chat`. | Low | High — Sarang AI streaming responses will become domain-accurate. |
| **P0** | **Dead Code** | Delete `src/components/SarangChatModal.tsx`. | Low | Medium — Removes 471 lines of tech debt. |
| **P0** | **Performance** | Remove `fetchProjectsFromDb()`, `jnanaProjects`, and `<ProjectModal>` from `AgentSection.tsx`. | Low | Medium — Eliminates redundant database query on initial mount. |
| **P1** | **Context Cleanup** | Remove `isChatOpen`, `setIsChatOpen`, `closeChat` from `AgentChatContext.tsx`. | Low | Low — Cleaner context API. |
| **P1** | **Security** | Add Next.js `middleware.ts` to protect `/admin` route with server session validation. | Medium | High — Secures admin dashboard against client inspection. |
| **P2** | **Mobile UI** | Change Section 5 specialist buttons grid to `grid-cols-1 xs:grid-cols-2` and tune mobile blurs. | Low | Low — Better small-screen polish and smoother mobile 60fps scrolling. |
