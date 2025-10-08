# TCM Intake App - Work Summary

## Completed Work

### Phase 1-4: ✅ COMPLETE
- Project setup with Next.js, TypeScript, Tailwind, Shadcn UI
- Type definitions for Patient, MedicalData, TCMData, AIStructuredNotes
- Constants file for symptoms, ICD codes, statuses
- Atomic components: StatusBadge, CopyButton, SectionHeader, PatientAvatar (with active state ring)
- Layout component: CollapsibleSidebar (with primary/secondary header props)

### Phase 5: ✅ COMPLETE (Items 15-17)
- **PatientCard**: Individual patient item with avatar, time, status badge (space-between layout)
- **PatientList**: Flat list of patients (no status grouping)
- **LeftSidebar**: Complete sidebar with CollapsibleSidebar wrapper
  - Expanded: "Today's Patients" header + PatientList
  - Collapsed: First 4 patient avatars (clickable, show active ring)
  - All showcased in /app/components/page.tsx with interactive state

### Phase 6: ✅ COMPLETE (Items 18-22)
- **TopNavigation**: Patient nav (prev/next), initials/time, auto-saving status, AI toggle
- **MedicalSection**: Reusable editable section for CC/HPI/PMH/FH/SH/ES
- **TCMChecklistItem**: Individual checkbox for symptoms
- **TCMAssessment**: Accordion with 16 symptom categories (Appetite, Taste, Stool, etc.)
- **MiddleColumn**: Integrates all above with ScrollArea

## Remaining Work - Phase 7: Right Sidebar (Items 23-32)

### Reference Images
- `docs/ui/1.0 - AI Structured Notes.png` - Right sidebar detail view
- `docs/ui/3.0 - All Shown.png` - Full three-column layout

### Components to Build

#### 23. InfoCard (wrapper component)
- Reusable card wrapper for all 9 right sidebar cards
- Props: title, icon, children, hasCopy (boolean)
- Light teal background, rounded corners
- Copy button in top-right when hasCopy=true
- Used by all cards below

#### 24. ChiefComplaintCard
- Uses InfoCard wrapper
- Multiple chief complaints with ICD codes
- Each complaint: text + ICD badge (gray background)
- Copy button per complaint

#### 25. HPICard
- Uses InfoCard
- Single text paragraph
- One copy button

#### 26. SubjectiveCard
- Uses InfoCard
- 4 sections: PMH, FH, SH, ES (each with heading + text)
- Highlighted keywords in teal color
- Stress Level badge (7/10 with orange background)
- One copy button for all

#### 27. TCMReviewCard
- Uses InfoCard
- Two-column bullet grid layout
- Categories with bullet lists (Appetite, Stool, Thirst, Sleep, Energy, Temperature, Sweat, Urine, Pain, Libido)
- One copy button

#### 28. ExaminationCard (reusable for Tongue & Pulse)
- Uses InfoCard
- Tongue: Body + Coating sections with purple text highlights
- Pulse: Single text description
- Separate cards, each with copy button

#### 29. DiagnosisCard
- Uses InfoCard
- TCM diagnosis with badge
- Multiple ICD codes with gray badges
- One copy button

#### 30. TreatmentCard
- Uses InfoCard
- Single text line (treatment principle)
- One copy button

#### 31. AcupunctureCard
- Uses InfoCard
- Grouped by body regions (Head/Neck, Hand, Forearm, Upper Arm, Abdomen/Back, Upper Leg, Lower Leg, Foot)
- Each region: heading + list of point codes
- Color-coded notes: orange "Right side only", purple "Both sides", default purple for point codes
- One copy button

#### 32. RightSidebar
- Uses CollapsibleSidebar wrapper
- Integrates all 9 cards in ScrollArea
- Expanded: "AI Structured Notes" header + all cards
- Collapsed: Just chevron (no vertical text needed)
- Primary prop: "AI Structured Notes" title
- Secondary prop: Auto-updating toggle + refresh button

## Next Steps

1. **Build InfoCard wrapper** (Item 23)
   - Create `components/right/InfoCard.tsx`
   - Teal background, icon in header, optional copy button

2. **Build all 9 specific cards** (Items 24-31)
   - Create files in `components/right/` folder
   - Each uses InfoCard wrapper
   - Follow exact styling from reference images
   - Use StatusBadge for ICD codes, stress levels, TCM diagnoses

3. **Build RightSidebar** (Item 32)
   - Create `components/right/RightSidebar.tsx`
   - Integrate all cards with CollapsibleSidebar
   - Add to showcase page

4. **Visual Testing with Playwright**
   - Start dev server: `npm run dev`
   - Navigate to localhost:3000
   - Use Playwright MCP to take screenshots
   - Compare with reference images in `docs/ui/`
   - Iterate on styling differences until pixel-perfect

5. **Integration** (Phase 8)
   - Build MainLayout (three-column grid)
   - Create comprehensive mock data
   - Wire up app/page.tsx
   - Test all interactive features

## Key Design Details

### Colors
- Teal: `#14B8A6` (teal-500) - Used for AI notes, TCM highlights
- Status colors: teal (completed), blue (active), orange (waiting), purple (scheduled)
- ICD badges: Gray background
- Stress badge: Orange background

### Typography
- Section headers: 12-14px, semibold
- Body text: 12-14px, regular
- All text: Gray-700 to Gray-900

### Spacing
- Cards: 16-24px padding
- Sections: 12-16px gap between
- Lists: 8-12px gap between items

## Files Structure
```
components/
├── atomic/          ✅ 4 components
├── layout/          ✅ 1 component (CollapsibleSidebar)
├── left/            ✅ 3 components
├── middle/          ✅ 5 components
└── right/           ⏳ 10 components (pending)
```

## Commands
- Dev server: `npm run dev`
- View showcase: `http://localhost:3000/components`
- View reference: `docs/ui/*.png`
