# TCM Intake App - Development Checklist

## 📋 **Project Overview**

Building a Traditional Chinese Medicine (TCM) intake application optimized for iPad 12.9" in landscape mode using:

- **Framework:** Next.js 14+ (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Components:** Shadcn UI
- **Layout:** Three-column collapsible design

---

## **Phase 1: Project Setup**

- [x] 1. Initialize Next.js + TypeScript project with App Router
- [x] 2. Configure Tailwind CSS (usually pre-configured in Next.js)
- [x] 3. Initialize Shadcn UI for Next.js
- [x] 4. Create folder structure (components/{atomic,layout,left,middle,right}, types, constants, data, lib)
- [x] 5. Define TypeScript types (Patient, MedicalData, TCMData, SidebarState)
- [ ] 6. Create constants file (symptoms, ICD codes, acupuncture points, statuses)

---

## **Phase 2: Install Shadcn Components**

- [ ] 7. Install Shadcn: card, badge, button
- [ ] 8. Install Shadcn: accordion, checkbox, scroll-area
- [ ] 9. Install Shadcn: separator, switch

---

## **Phase 3: Atomic Components** (Reusable Primitives)

- [ ] 10. Build **StatusBadge** component (handles all badge variants)
  - Variants: Completed, Active, Waiting, Scheduled, ICD codes, Stress level
- [ ] 11. Build **CopyButton** component (reusable copy functionality)
  - Used across all right sidebar cards
- [ ] 12. Build **SectionHeader** component (reusable section headers)
  - Props: title, icon, collapsible
- [ ] 13. Build **PatientAvatar** component (initials with status colors)
  - Used in patient list and collapsed sidebar

---

## **Phase 4: Layout Components**

- [ ] 14. Build **CollapsibleSidebar** layout component (reused for both sidebars)
  - Props: position ("left" | "right"), collapsedContent, children
  - Handles collapse/expand logic with smooth transitions

---

## **Phase 5: Left Sidebar Components**

- [ ] 15. Build **PatientCard** component (left sidebar patient item)
  - Uses: StatusBadge, PatientAvatar
- [ ] 16. Build **PatientList** component (groups patients by status)
  - Categories: Completed, Active, Waiting, Scheduled
- [ ] 17. Build **LeftSidebar** component (complete left column)
  - Uses: PatientList, CollapsibleSidebar
  - Collapsed view: Shows vertical patient initials

---

## **Phase 6: Middle Column Components**

- [ ] 18. Build **TopNavigation** component (patient info, AI toggle, auto-save)
  - Shows patient initials, time, auto-saving status, AI toggle
- [ ] 19. Build **MedicalSection** component (reused for CC/HPI/PMH/FH/SH/ES)
  - Props: title, content, editable
  - 6 sections total
- [ ] 20. Build **TCMChecklistItem** component (individual symptom checkbox)
  - Reused for all symptom items
- [ ] 21. Build **TCMAssessment** component (full symptom checklist)
  - Uses: TCMChecklistItem, Accordion
  - Categories: Appetite, Taste, Stool, Thirst, Urine, Sleep, Energy, Temp, Sweat, Head, Ear, Eye, Nose, Throat, Pain, Libido
- [ ] 22. Build **MiddleColumn** component (complete middle section)
  - Integrates: TopNavigation, MedicalSection, TCMAssessment

---

## **Phase 7: Right Sidebar Components** (AI Structured Notes)

- [ ] 23. Build **InfoCard** wrapper (reused for all right sidebar cards)
  - Props: title, icon, children, hasCopy
  - Used for 9 different card types
- [ ] 24. Build **ChiefComplaintCard** component
  - Uses: InfoCard, StatusBadge (ICD codes), CopyButton
- [ ] 25. Build **HPICard** component
  - Uses: InfoCard, CopyButton
- [ ] 26. Build **SubjectiveCard** component
  - Uses: InfoCard, CopyButton, StatusBadge (stress level)
  - Sections: PMH, FH, SH, ES with highlighted text
- [ ] 27. Build **TCMReviewCard** component
  - Uses: InfoCard, CopyButton
  - Two-column bullet grid layout
- [ ] 28. Build **ExaminationCard** component (for Tongue & Pulse)
  - Reusable for both examination types
  - Uses: InfoCard, CopyButton
- [ ] 29. Build **DiagnosisCard** component
  - Uses: InfoCard, StatusBadge (TCM & ICD codes), CopyButton
- [ ] 30. Build **TreatmentCard** component
  - Uses: InfoCard, CopyButton
- [ ] 31. Build **AcupunctureCard** component
  - Uses: InfoCard, StatusBadge (color-coded notes), CopyButton
  - Grouped by body regions with point codes
- [ ] 32. Build **RightSidebar** component (complete right column)
  - Integrates all 9 cards, CollapsibleSidebar
  - Collapsed view: Vertical "AI Structured Notes" text

---

## **Phase 8: Integration**

- [ ] 33. Build **MainLayout** component (three-column grid with sidebar state)
  - State management for left/right sidebar collapse
  - Responsive width calculations
  - Smooth transitions
- [ ] 34. Create comprehensive **mock data**
  - Patient list with all statuses
  - Complete medical history
  - TCM assessment data
  - Acupuncture points
- [ ] 35. Implement **app/page.tsx** (integrate all components)
  - Wire up MainLayout with mock data
  - Connect sidebar state management
  - Add "use client" directive for interactivity

---

## **Phase 9: Visual Testing with Playwright MCP**

- [ ] 36. Start dev server for visual testing
  - Run `npm run dev`
- [ ] 37. Use Playwright MCP to navigate to app (localhost:3000)
- [ ] 38. Take screenshot of **both sidebars expanded** state
  - Compare with: `docs/ui/3.0 - All Shown.png`
  - Verify: three-column layout, spacing, colors, typography
- [ ] 39. Click left sidebar collapse button
  - Take screenshot of collapsed left sidebar
  - Compare with: `docs/ui/4.0 - Hidden Left Bar.png`
  - Verify: vertical initials, chevron direction, animations
- [ ] 40. Click right sidebar collapse button
  - Take screenshot of collapsed right sidebar
  - Compare with: `docs/ui/2.0 - Hidden AI Notes.png`
  - Verify: vertical text, chevron direction, animations
- [ ] 41. Take screenshot of **right sidebar detail view**
  - Compare with: `docs/ui/1.0 - AI Structured Notes.png`
  - Verify: all 9 cards, ICD codes, acupuncture points, formatting
- [ ] 42. Iterate on visual differences until pixel-perfect
  - Fix spacing, colors, fonts, sizing issues
  - Re-screenshot and compare

## **Phase 10: Documentation & Final Review**

- [ ] 43. Add **JSDoc comments** to all components
  - Document props, purpose, and usage examples
- [ ] 44. **Final code review and cleanup**
  - Check for code duplication
  - Verify clean code principles
  - Remove console.logs and debug code
  - Optimize performance

---

## **Component Architecture Summary**

### **Folder Structure (Next.js App Router)**

```
app/
├── page.tsx                 # Main page (home route)
├── layout.tsx               # Root layout
└── globals.css              # Global styles

components/
├── atomic/                  # 4 reusable primitives
│   ├── StatusBadge.tsx
│   ├── CopyButton.tsx
│   ├── SectionHeader.tsx
│   └── PatientAvatar.tsx
├── layout/                  # 2 layout wrappers
│   ├── CollapsibleSidebar.tsx
│   └── MainLayout.tsx
├── left/                    # 3 left sidebar components
│   ├── PatientCard.tsx
│   ├── PatientList.tsx
│   └── LeftSidebar.tsx
├── middle/                  # 5 middle column components
│   ├── TopNavigation.tsx
│   ├── MedicalSection.tsx
│   ├── TCMChecklistItem.tsx
│   ├── TCMAssessment.tsx
│   └── MiddleColumn.tsx
├── right/                   # 10 right sidebar components
│   ├── InfoCard.tsx         (wrapper)
│   ├── ChiefComplaintCard.tsx
│   ├── HPICard.tsx
│   ├── SubjectiveCard.tsx
│   ├── TCMReviewCard.tsx
│   ├── ExaminationCard.tsx
│   ├── DiagnosisCard.tsx
│   ├── TreatmentCard.tsx
│   ├── AcupunctureCard.tsx
│   └── RightSidebar.tsx
└── ui/                      # Shadcn components

types/
└── index.ts                 # All TypeScript interfaces

constants/
└── medical.ts               # All static data

data/
└── mockData.ts              # Sample patient data

lib/
└── utils.ts                 # Helper functions
```

**Note:** All interactive components (with useState, onClick, etc.) will use `"use client"` directive at the top.

### **Key Reusability Wins**

- **StatusBadge**: 1 component for 7+ different badge types
- **InfoCard**: 1 wrapper for 9 different card types
- **CollapsibleSidebar**: 1 component for 2 sidebars
- **MedicalSection**: 1 component for 6 sections
- **ExaminationCard**: 1 component for Tongue & Pulse
- **CopyButton**: 1 component used 10+ times

### **Shadcn Components Used** (8 total)

1. Card
2. Badge
3. Button
4. Accordion
5. Checkbox
6. ScrollArea
7. Separator
8. Switch

---

## **Clean Code Principles**

✅ **DRY** - No duplicate logic
✅ **Single Responsibility** - Each component has one job
✅ **Composition** - Build complex from simple
✅ **TypeScript** - Full type safety
✅ **JSDoc** - All components documented
✅ **Organized** - Clear folder structure

---

---

## **Testing Strategy with Playwright MCP**

### **Visual Verification Process**

1. Build component → Run dev server
2. Navigate to localhost:3000 with Playwright
3. Take screenshot of current state
4. Compare side-by-side with design reference
5. Identify visual differences (spacing, colors, fonts)
6. Fix issues and iterate
7. Re-screenshot until pixel-perfect match

### **Design Reference Files**

- `docs/ui/1.0 - AI Structured Notes.png` - Right sidebar detail view
- `docs/ui/2.0 - Hidden AI Notes.png` - Right sidebar collapsed
- `docs/ui/3.0 - All Shown.png` - Both sidebars expanded (main view)
- `docs/ui/4.0 - Hidden Left Bar.png` - Left sidebar collapsed

### **Verification Checklist Per Screenshot**

- ✅ Layout & spacing matches exactly
- ✅ Colors (backgrounds, text, badges) are accurate
- ✅ Typography (font sizes, weights, line heights) match
- ✅ Icons and badges positioned correctly
- ✅ Border radius and shadows match design
- ✅ Collapse/expand animations smooth

---

**Total Components: ~25**
**Total Steps: 44**
**Testing Method: Playwright MCP visual comparison**
**Estimated Development Time: Based on complexity and iterative testing**
