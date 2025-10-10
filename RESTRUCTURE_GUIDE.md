# 📘 CODEBASE RESTRUCTURE - COMPLETION GUIDE

## ✅ COMPLETED (Phases 1-2)

**Phase 1 - Cleanup:**
- ✅ Deleted 5 unused components (226 lines)
- ✅ Deleted 2 unused lib files (487 lines)
- ✅ Deleted unused constants (68 lines)
- ✅ Deleted unused mock data (320 lines)
- ✅ Removed unused `moment` package
- ✅ Fixed `.gitignore`
- ✅ Archived old documentation
- ✅ Fixed exposed API key

**Phase 2 - Naming:**
- ✅ Renamed 4 components for clarity
- ✅ Updated all imports and usages

**Total cleanup:** 1,421 lines removed

---

## 🚀 TO COMPLETE (Phases 3-8)

### Phase 3: Type Consolidation ✅ (AUTOMATED)

**Run this:**
```bash
chmod +x CODEBASE_RESTRUCTURE_COMPLETION.sh
./CODEBASE_RESTRUCTURE_COMPLETION.sh
```

**What it does:**
- Creates `types/patient.ts`
- Creates `types/clinical-notes.ts`
- Creates `types/ai-notes.ts`
- Updates `types/index.ts` to export all

**Time:** 2 minutes (automated)

---

### Phase 4: lib/ Restructure ✅ (AUTOMATED)

**Included in script above**

**What it does:**
```
Before:                    After:
lib/                       lib/
├── aiPipeline.ts    →    ├── ai/
├── aiTransformer.ts →    │   ├── pipeline.ts
├── clinicalNotes... →    │   ├── transformer.ts
├── localStorage.ts  →    │   ├── notes-parser.ts
├── constants.ts     →    │   └── index.ts
└── utils.ts         →    ├── storage/
                           │   ├── local-storage.ts
                           │   └── index.ts
                           └── utils/
                               ├── cn.ts
                               ├── constants.ts
                               └── index.ts
```

**Time:** 2 minutes (automated)

---

### Phase 5: Extract Custom Hooks ✅ (AUTOMATED)

**Included in script above**

**Creates:**
- `hooks/usePatientData.ts` - Patient CRUD + localStorage
- `hooks/usePatientSelection.ts` - Current patient logic
- `hooks/useClinicalNotes.ts` - Notes state + auto-save
- `hooks/useSidebarState.ts` - Sidebar open/close state

**Time:** 2 minutes (automated)

---

### Phase 6: Component Reorganization ⚠️ (MANUAL)

**This is the big one - requires manual work**

#### Target Structure:
```
components/
├── patient/                   # Patient-related
│   ├── PatientAvatar.tsx
│   ├── PatientCard.tsx
│   ├── PatientList.tsx
│   └── PatientDemographicsCard.tsx
│
├── clinical-notes/            # Clinical notes features
│   ├── ClinicalNotesEditor.tsx
│   ├── ClinicalSectionLabel.tsx
│   ├── TCMSection.tsx
│   └── TopNavigation.tsx
│
├── ai-notes/                  # AI-generated notes
│   ├── cards/
│   │   ├── ChiefComplaintCard.tsx
│   │   ├── HistoryPresentIllnessCard.tsx
│   │   ├── SubjectiveCard.tsx
│   │   ├── TongueExaminationCard.tsx
│   │   ├── PulseExaminationCard.tsx
│   │   ├── DiagnosisCard.tsx
│   │   ├── TreatmentCard.tsx
│   │   └── AcupunctureCard.tsx
│   ├── PatientDemographicsCard.tsx
│   └── AINotesPanel.tsx
│
├── layout/                    # Layout containers
│   ├── MainLayout.tsx
│   ├── CollapsiblePanel.tsx
│   ├── PatientListPanel.tsx
│   └── NotesEditorPanel.tsx
│
├── shared/                    # Shared primitives
│   ├── StatusBadge.tsx
│   ├── CopyButton.tsx
│   └── SectionHeader.tsx
│
└── ui/                        # Shadcn UI primitives
    └── ... (unchanged)
```

#### Steps:

**1. Create new folder structure:**
```bash
mkdir -p components/patient
mkdir -p components/clinical-notes
mkdir -p components/ai-notes/cards
mkdir -p components/shared
```

**2. Move atomic components to shared:**
```bash
mv components/atomic/* components/shared/
rmdir components/atomic
```

**3. Move left sidebar components to patient:**
```bash
mv components/left/PatientAvatar.tsx components/patient/
mv components/left/PatientCard.tsx components/patient/
mv components/left/PatientList.tsx components/patient/
mv components/left/LeftSidebar.tsx components/layout/PatientListPanel.tsx
rmdir components/left
```

**4. Move middle components to clinical-notes:**
```bash
mv components/middle/ClinicalNotesEditor.tsx components/clinical-notes/
mv components/middle/ClinicalSectionLabel.tsx components/clinical-notes/
mv components/middle/TCMSection.tsx components/clinical-notes/
mv components/middle/TopNavigation.tsx components/clinical-notes/
mv components/middle/MiddleColumn.tsx components/layout/NotesEditorPanel.tsx
rmdir components/middle
```

**5. Move right sidebar components:**
```bash
mv components/right/ChiefComplaintCard.tsx components/ai-notes/cards/
mv components/right/HistoryPresentIllnessCard.tsx components/ai-notes/cards/
mv components/right/SubjectiveCard.tsx components/ai-notes/cards/
mv components/right/TongueExaminationCard.tsx components/ai-notes/cards/
mv components/right/PulseExaminationCard.tsx components/ai-notes/cards/
mv components/right/DiagnosisCard.tsx components/ai-notes/cards/
mv components/right/TreatmentCard.tsx components/ai-notes/cards/
mv components/right/AcupunctureCard.tsx components/ai-notes/cards/
mv components/right/PatientDemographicsCard.tsx components/ai-notes/
mv components/right/RightSidebar.tsx components/ai-notes/AINotesPanel.tsx
rmdir components/right
```

**6. Rename layout files:**
```bash
mv components/layout/CollapsibleSidebar.tsx components/layout/CollapsiblePanel.tsx
```

**Time:** 1-2 hours

---

### Phase 7: Update All Imports ⚠️ (SEMI-AUTOMATED)

After moving files, run global find-replace:

```bash
# Update lib imports
find . -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/@\/lib\/aiPipeline/@\/lib\/ai\/pipeline/g'
find . -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/@\/lib\/aiTransformer/@\/lib\/ai\/transformer/g'
find . -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/@\/lib\/clinicalNotesParser/@\/lib\/ai\/notes-parser/g'
find . -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/@\/lib\/localStorage/@\/lib\/storage\/local-storage/g'
find . -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/@\/lib\/constants/@\/lib\/utils\/constants/g'
find . -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/from "@\/lib\/utils"/from "@\/lib\/utils\/cn"/g'

# Update component imports (examples - adjust as needed)
find . -name "*.tsx" | xargs sed -i '' 's/@\/components\/atomic/@\/components\/shared/g'
find . -name "*.tsx" | xargs sed -i '' 's/@\/components\/left\/LeftSidebar/@\/components\/layout\/PatientListPanel/g'
find . -name "*.tsx" | xargs sed -i '' 's/@\/components\/middle\/MiddleColumn/@\/components\/layout\/NotesEditorPanel/g'
find . -name "*.tsx" | xargs sed -i '' 's/@\/components\/right\/RightSidebar/@\/components\/ai-notes\/AINotesPanel/g'
```

**Time:** 30 minutes

---

### Phase 8: Test & Verify ⚠️ (MANUAL)

**1. Build test:**
```bash
npm run build
```

**2. Run development server:**
```bash
npm run dev
```

**3. Test in browser:**
- Navigate to http://localhost:3000
- Open all sidebars
- Add a patient
- Enter clinical notes
- Generate AI notes
- Check all cards render
- Check console for errors

**4. Playwright test (optional but recommended):**
```bash
# Install Playwright if needed
npx playwright install chromium

# Run headless test
npx playwright test
```

**Time:** 30 minutes

---

## 🎯 RECOMMENDED EXECUTION PLAN

### Option A: All at Once (4-5 hours)
```bash
# 1. Run automated script (5 min)
./CODEBASE_RESTRUCTURE_COMPLETION.sh

# 2. Manual component reorganization (1-2 hrs)
# Follow Phase 6 steps above

# 3. Update imports (30 min)
# Run Phase 7 find-replace commands

# 4. Test (30 min)
# Follow Phase 8 steps

# 5. Commit
git add -A
git commit -m "refactor: Complete codebase restructure (Phases 3-8)"
```

### Option B: Incremental (safer)
```bash
# Day 1: Run Phase 3-5 (10 min)
./CODEBASE_RESTRUCTURE_COMPLETION.sh
git add -A && git commit -m "refactor: Phases 3-5 complete"

# Day 2: Phase 6 - Component reorganization (2 hrs)
# Do the manual moves, test frequently
git add -A && git commit -m "refactor: Phase 6 - component reorganization"

# Day 3: Phase 7-8 - Final cleanup (1 hr)
# Update imports, test, commit
git add -A && git commit -m "refactor: Phases 7-8 complete - all done!"
```

---

## ⚡ QUICK REFERENCE

### What Changed:

| Before | After |
|--------|-------|
| `@/lib/aiPipeline` | `@/lib/ai/pipeline` |
| `@/lib/localStorage` | `@/lib/storage/local-storage` |
| `@/lib/utils` | `@/lib/utils/cn` |
| `@/components/atomic/*` | `@/components/shared/*` |
| `@/components/left/LeftSidebar` | `@/components/layout/PatientListPanel` |
| `@/components/middle/MiddleColumn` | `@/components/layout/NotesEditorPanel` |
| `@/components/right/RightSidebar` | `@/components/ai-notes/AINotesPanel` |

### Files to Update:
- `app/page.tsx` - Update MainLayout import paths
- `app/api/analyze/route.ts` - Update lib imports
- `components/layout/MainLayout.tsx` - Update hook imports and component imports
- All card components - Update PatientDemographicsCard import path

---

## 🐛 TROUBLESHOOTING

**Build errors after restructure:**
1. Check import paths match new structure
2. Ensure all hooks are exported from their files
3. Verify type exports in `types/index.ts`

**Runtime errors:**
1. Check browser console for missing modules
2. Verify all files were moved correctly
3. Check for circular dependencies

**Type errors:**
1. Restart TypeScript server in VS Code
2. Delete `.next/` folder and rebuild
3. Check `types/index.ts` exports all needed types

---

## 📝 NOTES

- Phases 3-5 are **fully automated** - just run the script
- Phase 6 is **manual** but straightforward - follow the move commands
- Phase 7 is **semi-automated** - run find-replace commands
- Phase 8 is **manual testing** - critical, don't skip!

- **Estimated total time:** 4-5 hours
- **Can be done incrementally** - commit after each phase
- **Low risk** - everything is version controlled

---

## ✅ CHECKLIST

- [ ] Run `./CODEBASE_RESTRUCTURE_COMPLETION.sh`
- [ ] Verify types reorganized (`types/patient.ts`, etc.)
- [ ] Verify lib/ restructured (`lib/ai/`, `lib/storage/`, etc.)
- [ ] Verify hooks created (4 new hook files)
- [ ] Move components to feature folders
- [ ] Update all import paths
- [ ] Build succeeds (`npm run build`)
- [ ] Dev server runs (`npm run dev`)
- [ ] All features work in browser
- [ ] Commit final changes

---

**Questions? Check the original audit report in this conversation for detailed explanations.**
