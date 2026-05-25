# BSD IP Landscape Note

**Last updated:** 2026-05-25
**Author:** Augustin Chan, Digital Rain Technologies

## BSD Ownership

The Baton Scene Description (BSD) schema is classified as **General-Purpose Tooling** under Section 6.8 of the STS CTO Heads of Agreement V5 (fully executed May 16, 2026, both parties).

- **Owner:** Augustin Chan / Digital Rain Technologies
- **License to STS:** Perpetual, royalty-free, non-exclusive, irrevocable
- **Publication rights:** Full rights to publish, open-source, license, and commercialize independently
- **Publication conditions satisfied:**
  - (a) Co-authorship: JK Fidden named as co-author
  - (b) STS Attribution: Acknowledgment included in all publications
  - (c) Timing gate: Agreement fully executed before publication

The test for General-Purpose Tooling (Section 6.8): "whether the system, framework, or schema has utility and application beyond STS — that is, whether it would be independently valuable in a non-STS context." BSD is a model-agnostic interchange format with no STS-specific content.

## Patent: US 10,825,227 B2

**Title:** Artificial Intelligence for Generating Structured Descriptions of Scenes

| Field | Detail |
|-------|--------|
| Patent No. | US 10,825,227 B2 |
| Filed | December 21, 2018 |
| Granted | November 3, 2020 |
| Inventors | Mohamed R. Amer, Alex C. Tozzo, Dejan Jovanovic, Timothy J. Meo |
| Original assignee | SRI International (Menlo Park, CA) |
| Current assignee | Gleneagle Innovations LP (transferred August 8, 2025) |
| Expires | December 21, 2038 |
| Status | Active |

### What the patent covers

The patent describes techniques for:
- Training a machine learning model to generate predefined data structures from textual, visual, and other information about scenes
- Generating structured scene descriptions (composition graphs specifying objects, events, actors, actions, locations, timeframes)
- Using GANs to generate animations or video clips from scene descriptions
- An explainable AI system providing end users with understanding of system decisions

### How BSD is distinct

BSD is a **data format specification** — a typed schema defining how directorial intent is represented as structured data. It is not a method for generating scene descriptions from input.

The distinction parallels:
- **MIDI** (data format) vs. a **synthesizer** (generation method)
- **JSON Schema** (format specification) vs. a **parser** (implementation)
- **OpenUSD** (scene graph format) vs. a **renderer** (realization engine)

BSD defines vocabulary and structure. The patent covers a generation method. These are complementary, not overlapping concerns.

### Risk assessment

- **Low risk** for the schema specification itself (BSD as a data format)
- **Moderate awareness needed** for any system that *generates* BSD from multimodal input (e.g., the Baton interpretation engine, which is STS IP under Section 6.2)
- Gleneagle Innovations LP is a non-practicing entity — monitor for enforcement activity
- The paper cites this patent explicitly to establish awareness and distinguish BSD's contribution

## Canonical repository

`digital-rain-tech/baton-scene-description` — BSD is published under Digital Rain Technologies, consistent with its classification as Appointee-owned General-Purpose Tooling. The canonical repo should remain under this org.

## Reference documents

- `STS CTO HOA V5 - Signed.pdf` — Fully executed agreement (both parties, May 16, 2026)
- `AC CTO STS Section 5 Disclosure - Signed.pdf` — JK's signed acknowledgment of Existing Ventures carve-out
- `US10825227B2 - AI Structured Scene Descriptions (Gleneagle-SRI).pdf` — Full patent text
- All filed in `digital-rain-admin/clients/sts/`
