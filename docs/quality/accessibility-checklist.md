# ♿ Accessibility and Interaction Checklist

Apply this checklist to the web application, editors, dialogs, canvas interactions, and challenge surfaces.

## Navigation and semantics

- [ ] All interactive actions are keyboard reachable.
- [ ] Focus order follows visual and task order.
- [ ] Landmarks and headings describe the page hierarchy.
- [ ] Buttons and links have meaningful accessible names.
- [ ] Dialogs trap focus appropriately, close predictably, and return focus.
- [ ] Form controls expose labels, errors, and required state.

## Visual presentation

- [ ] Text and controls meet WCAG contrast targets.
- [ ] Color is not the only way to communicate status.
- [ ] Zoom and text resizing do not hide essential content.
- [ ] Focus indicators are visible against all themes.
- [ ] Reduced-motion preferences are respected.

## Editors and canvases

- [ ] Core actions have keyboard alternatives to drag-and-drop.
- [ ] Editor status and errors are announced accessibly.
- [ ] Autocomplete and popovers do not trap or steal focus unexpectedly.
- [ ] System Design nodes and connections have accessible descriptions and non-pointer alternatives.
- [ ] Terminal output can be navigated and copied without relying only on color.

## Validation

Record manual assistive-technology/browser combinations and results. Automated axe scans are useful but do not establish WCAG conformance by themselves. Do not claim certification without a complete audit.
