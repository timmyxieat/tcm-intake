# TCM Intake App - Implementation Plan (Essential MVP)

## Overview
Essential MVP features to make the app functional. Focus: clean, DRY code, reusing existing components.

---

## ✅ Phase 1: Local Storage Service (COMPLETED)

**Files Created:**
- ✅ `lib/localStorage.ts` - Type-safe CRUD operations, error handling, export/import
- ✅ `app/test/page.tsx` - Visual testing interface at `http://localhost:3000/test`

**What Works:**
- Add/delete/update patients
- Save/load clinical notes and AI notes
- Preferences management
- Storage statistics
- Data persists across page refreshes

---

## ✅ Phase 2: Integrate localStorage into Main App (COMPLETED)

**Files Modified:** `components/layout/MainLayout.tsx`, `components/middle/MiddleColumn.tsx`, `components/middle/TopNavigation.tsx`, `components/middle/SectionLabel.tsx`, `components/middle/TCMSection.tsx`, `lib/localStorage.ts`

**Tasks:**
- [x] Import storage utility
- [x] Load patients from localStorage on mount (instead of mock data)
- [x] Load preferences from localStorage on mount (including selected patient)
- [x] Load clinical notes from localStorage on mount
- [x] Auto-save clinical notes (debounced 2s)
- [x] Save sidebar preferences when they change
- [x] Save selected patient to localStorage
- [x] Update patient status dynamically (scheduled → active → completed)
- [x] Category completion tracking with strikethrough
- [x] Keyboard shortcuts (Cmd+[ left sidebar, Cmd+] right sidebar)
- [x] Test: data persists across page refresh

**What Works:**
- Auto-save with status indicator (Saving.../Saved)
- Selected patient persists across refreshes
- Category labels crossed out when typed on own line
- TCM header crossed out when all subcategories complete
- Sidebar preferences persist
- Keyboard shortcuts for toggling sidebars

**Time:** ~90 minutes (expanded scope)

---

## ✅ Phase 3: Add Patient Functionality (COMPLETED)

**File:** `components/left/LeftSidebar.tsx`

**Tasks:**
- [x] Import storage utility
- [x] Complete `handleConfirmAdd` function
- [x] Create new Patient object with timestamp ID
- [x] Save to localStorage using `storage.addPatient()`
- [x] Select the new patient after adding
- [x] Reset form after adding
- [x] Test: add patient → appears in list → persists

**What Works:**
- Add patient with initials and time
- Patient immediately appears in list
- New patient is auto-selected
- Data persists across page refresh

**Time:** 15 minutes

---

## 🔄 Phase 4: AI Generation API

**Files to Create:**
- [ ] `.env.local` - Add OpenAI API key (not committed)
- [ ] `.env.local.example` - Template for API key (committed)
- [ ] `app/api/generate-notes/route.ts` - API endpoint

**Tasks:**
- [ ] Install openai package: `npm install openai`
- [ ] Create API route that accepts clinical notes
- [ ] Call OpenAI with gpt-4o-mini model
- [ ] Build TCM extraction prompt matching `AIStructuredNotes` type
- [ ] Parse and return JSON response
- [ ] Add error handling
- [ ] Test API with sample notes

**Time:** 60 minutes

---

## 🔄 Phase 5: Wire Up Generate & Refresh Buttons

**Files:** `components/layout/MainLayout.tsx`, `components/middle/TopNavigation.tsx`, `components/right/RightSidebar.tsx`

**AI Generation Workflow:**
1. User clicks "Generate Structured Notes" → AI notes created for first time
2. User edits clinical notes → red dot appears on refresh button
3. User clicks refresh button → AI notes updated with latest clinical notes

**Tasks:**
- [ ] Add `isGenerating` state to MainLayout
- [ ] Track last generated timestamp and last edited timestamp
- [ ] Show red dot indicator when notes changed after last generation
- [ ] Wire up "Generate Structured Notes" button (TopNavigation)
  - [ ] Validate notes exist before calling API
  - [ ] Call `/api/generate-notes`
  - [ ] Save AI response to localStorage
  - [ ] Save generation timestamp
  - [ ] Update patient status to "completed"
  - [ ] Reload UI to show AI cards
- [ ] Wire up "Refresh" button (RightSidebar)
  - [ ] Reuse same generation logic
  - [ ] Clear red dot indicator after refresh
  - [ ] Update generation timestamp
- [ ] Add loading state (spinner) to both buttons
- [ ] Disable buttons during generation
- [ ] Test: generate → cards populate → edit notes → red dot appears → refresh → red dot clears

**Time:** 45 minutes

---

## 🔄 Phase 6: End-to-End Testing

**Tasks:**
- [ ] Navigate to main app with Playwright
- [ ] Add patient → verify appears in list
- [ ] Type clinical notes → verify auto-saves
- [ ] Generate AI notes → verify cards populate
- [ ] Edit notes → verify red dot appears on refresh button
- [ ] Click refresh → verify red dot clears and AI updates
- [ ] Refresh page → verify all data persists
- [ ] Switch patients → verify notes are separate per patient
- [ ] Check console for errors
- [ ] Test storage page at `/test`
- [ ] Verify storage stats are accurate

**Time:** 30 minutes

---

## 📋 Quick Reference Checklist

### Phase 2: localStorage Integration
- [ ] Import storage in MainLayout
- [ ] Load patients/notes/preferences on mount
- [ ] Auto-save notes (debounced 2s)
- [ ] Save preferences on change
- [ ] Dynamic patient status updates

### Phase 3: Add Patient
- [ ] Complete `handleConfirmAdd` function
- [ ] Save to localStorage
- [ ] Test: add → persists

### Phase 4: AI API
- [ ] Create `.env.local` + `.env.local.example`
- [ ] Install openai package
- [ ] Create API route
- [ ] Build TCM prompt
- [ ] Test with sample notes

### Phase 5: Wire Generate & Refresh
- [ ] Track generation timestamp vs edit timestamp
- [ ] Show red dot when notes outdated
- [ ] Wire up Generate button (TopNavigation)
- [ ] Wire up Refresh button (RightSidebar)
- [ ] Add loading states
- [ ] Test: generate → edit → red dot → refresh → clears

### Phase 6: Testing
- [ ] Full workflow with Playwright
- [ ] Verify red dot indicator works
- [ ] Verify persistence
- [ ] No errors

---

## 🎯 MVP Success Criteria

**Must Have:**
1. ✅ Add new patient (initials + time)
2. ✅ Type notes that auto-save to localStorage
3. ✅ Generate AI structured notes via ChatGPT (Generate button)
4. ✅ Refresh AI notes when clinical notes change (Refresh button + red dot)
5. ✅ View AI notes in cards (right sidebar)
6. ✅ All data persists across sessions

**Removed (Not Needed for MVP):**
- ~~Auto-update toggle~~ (using manual refresh with red dot instead)
- ~~Export/Import~~ (already in test page, not needed in main app)
- ~~Delete patient~~ (can add later)

---

## 📦 Files Summary

**Created (Phase 1):**
- ✅ `lib/localStorage.ts`
- ✅ `app/test/page.tsx`

**To Create:**
- [ ] `app/api/generate-notes/route.ts`
- [ ] `.env.local`
- [ ] `.env.local.example`

**To Modify:**
- [ ] `components/layout/MainLayout.tsx` (localStorage integration, generation logic, red dot tracking)
- [ ] `components/left/LeftSidebar.tsx` (add patient)
- [ ] `components/middle/TopNavigation.tsx` (Generate button loading state)
- [ ] `components/right/RightSidebar.tsx` (Refresh button with red dot indicator)
- [ ] `package.json` (add openai)

---

## ⏱️ Time Estimates

| Phase | Description | Time |
|-------|-------------|------|
| ✅ 1 | localStorage + test page | 2 hrs (DONE) |
| 2 | MainLayout integration | 30 min |
| 3 | Add Patient | 15 min |
| 4 | AI API endpoint | 60 min |
| 5 | Wire Generate & Refresh | 45 min |
| 6 | Testing | 30 min |
| **Total Remaining** | | **~3 hours** |

---

## 🚀 Next Steps

1. Phase 2 - Integrate localStorage into MainLayout
2. Phase 3 - Add Patient functionality
3. Phase 4 - AI API endpoint (requires OpenAI API key)
4. Phase 5 - Wire up Generate & Refresh buttons with red dot indicator
5. Phase 6 - Full testing

---

## 📝 Technical Decisions

- **Storage:** localStorage only
- **AI Model:** gpt-4o-mini (fast, cheap)
- **Patient ID:** Timestamp (`Date.now()`)
- **Debounce:** 2s auto-save for clinical notes
- **Error Handling:** Simple alerts (MVP)
- **AI Workflow:** Manual generation + manual refresh with red dot indicator (no auto-update)
- **Red Dot Logic:** Compare last edit timestamp vs last generation timestamp

---

## 🔴 Red Dot Indicator Logic

**State to Track:**
```typescript
lastEditedTimestamp: number | null    // When notes were last edited
lastGeneratedTimestamp: number | null // When AI notes were last generated
```

**Show Red Dot When:**
- AI notes exist (generated at least once)
- AND notes have been edited after last generation
- `lastEditedTimestamp > lastGeneratedTimestamp`

**Clear Red Dot When:**
- User clicks Refresh button
- Update `lastGeneratedTimestamp` to current time

---

*Last updated: 2025-10-09*
*Status: Phases 1-3 Complete, Ready for Phase 4-6*
