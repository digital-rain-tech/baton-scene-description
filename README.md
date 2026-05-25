# Baton Scene Description (BSD) — Schema Specification v0.3

**Authors:** Augustin Chan, JK Fidden
**Affiliation:** STS Creative
**License:** Apache 2.0

## Overview

The Baton Scene Description (BSD) is a typed interchange schema for cinematic directorial intent. It captures what a film director *wants* — camera movement, lighting style, character emotional state, scene flow control — as structured, machine-readable data. BSD complements existing scene description formats like OpenUSD (which describes what a scene *contains*) by adding an intent layer: the format for what the director *means*.

BSD uses a two-layer architecture. **SessionContext** establishes the world bible, character and location registries, style guide, and consistency anchors once per directing session. **BeatDescription** is produced every interpretation tick (typically every 3 seconds) and captures the director's real-time intent: camera state, lighting, character performance, mood, flow control, transitions, and dialogue.

The schema vocabulary is grounded in standard directorial terminology — camera movements from film grammar, three-point lighting foundations, shot types from cinematography practice — making it immediately legible to working directors while remaining machine-parseable for downstream AI generation systems, USD scene graphs, and OTIO editorial timelines.

## Schema Versions

| Version | Description |
|---------|-------------|
| **v0.1** | Flat 11-field scene description: camera, lighting, characters, environment, mood, flow control, transitions |
| **v0.2** | Two-layer architecture: SessionContext (world bible, registries) + BeatDescription (per-tick). Adds style guides, negative prompts, location references, duration |
| **v0.3** | Character interactions, character modes, reference images, structured dialogue lines, narrative function |

All three versions are published as JSON Schema. v0.3 is the current citable version.

## Files

```
schema/
  bsd-v0.1.schema.json           # v0.1 SceneDescription (flat)
  bsd-v0.2.schema.json           # v0.2 BeatDescription
  bsd-v0.2-session.schema.json   # v0.2 SessionContext
  bsd-v0.3.schema.json           # v0.3 BeatDescriptionV3
  bsd-v0.3-session.schema.json   # v0.3 SessionContextV3
typescript/
  scene-schema.ts                # TypeScript source of truth (all versions)
paper/
  (arXiv preprint source — forthcoming)
```

All schemas use JSON Schema draft 2020-12.

## Quick Example

A minimal v0.3 BeatDescription:

```json
{
  "version": "0.3",
  "session_id": "session-001",
  "beat_id": "beat-042",
  "sequence_num": 42,
  "timestamp_ms": 1716600000000,
  "narrative_function": "turn",
  "camera": {
    "movement": "dolly_in",
    "movement_speed": 0.3,
    "angle": "eye_level",
    "shot_type": "close_up",
    "composition": {
      "subject_position": "left_third",
      "depth_of_field": "shallow",
      "headroom": 0.3,
      "look_room": 0.6
    }
  },
  "lighting": {
    "sources": [
      { "role": "key", "quality": "hard", "direction": "side_left", "intensity": 0.9, "color_temp_k": 3200 }
    ],
    "style": "chiaroscuro",
    "time_of_day": "night",
    "color_temp_k": 3200,
    "contrast_ratio": 8
  },
  "characters": [
    {
      "character_ref": "marcus",
      "active_mode": "desperate",
      "emotional_state": "quiet rage",
      "emotional_intensity": 0.8,
      "action": "turns away from the window",
      "blocking": "moves from window to center",
      "is_speaking": true,
      "dialogue": "You don't get to decide that.",
      "performance_note": "play the decision, not the emotion"
    }
  ],
  "interactions": [],
  "environment": {
    "location_ref": "apartment",
    "mode": "imagined",
    "description": "dimly lit apartment, rain on windows",
    "weather": "rain",
    "time_period": "contemporary",
    "interior_exterior": "interior"
  },
  "mood": "tension breaking",
  "mood_intensity": 0.8,
  "flow_control": "action",
  "dialogue_lines": [
    { "speaker_ref": "marcus", "line": "You don't get to decide that.", "delivery_note": "measured, not shouting" }
  ],
  "reference_images": [],
  "negative_prompts": ["cartoon", "anime", "oversaturated"],
  "direction_notes": "hold on his face — let the silence do the work after the line"
}
```

## Intent vs Realization

BSD occupies the **intent layer** in the production pipeline:

| Layer | Format | Captures |
|-------|--------|----------|
| **Intent** | BSD | What the director *wants*: mood, emotional intensity, performance notes, flow control, framing decisions |
| **Realization** | USD | What the scene *contains*: geometry, transforms, materials, light physics, animation curves |
| **Editorial** | OTIO | How shots are *assembled*: clips, transitions, timeline structure |

BSD maps to both USD (for spatial computing and scene graphs) and AI video generation prompts (for text-to-video and image-to-video systems).

## How to Cite

```bibtex
@misc{chan2026bsd,
  author       = {Chan, Augustin and Fidden, JK},
  title        = {{Baton Scene Description (BSD): Schema Specification v0.3}},
  year         = {2026},
  publisher    = {Zenodo},
  doi          = {10.5281/zenodo.XXXXXXX},
  url          = {https://doi.org/10.5281/zenodo.XXXXXXX}
}
```

See: "Baton Scene Description: A Typed Intent Schema Bridging Embodied Direction and AI Scene Generation" (arXiv preprint, forthcoming)

## License

Apache License 2.0. See [LICENSE](LICENSE).
