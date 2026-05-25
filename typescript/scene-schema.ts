/**
 * Baton Scene Description Schema
 *
 * v0.1 — Per-beat typed scene description (ADR-004)
 * v0.2 — Two-layer: SessionContext + BeatDescription (ADR-005)
 *
 * Version history:
 *   v0.0  7 flat strings (camera, lighting, mood, action, dialogue, environment, direction_notes)
 *   v0.1  11 fields + typed BSD with enums, numerics, character arrays, composition
 *   v0.2  Session-level world bible, character/location registries, negative prompts, duration
 *   v0.3  Character interactions, character modes, reference images, structured dialogue, narrative function
 */

// ---------------------------------------------------------------------------
// Camera
// ---------------------------------------------------------------------------

export const CAMERA_MOVEMENTS = [
  "static",
  "pan_left", "pan_right", "whip_pan",
  "tilt_up", "tilt_down",
  "pedestal_up", "pedestal_down",
  "truck_left", "truck_right",
  "dolly_in", "dolly_out",
  "zoom_in", "zoom_out",
  "dolly_zoom",
  "crane_up", "crane_down",
  "tracking",
  "arc_left", "arc_right",
  "steadicam", "handheld",
] as const;
export type CameraMovement = typeof CAMERA_MOVEMENTS[number];

export const CAMERA_ANGLES = [
  "eye_level",
  "low_angle",
  "high_angle",
  "birds_eye",
  "worms_eye",
  "dutch_angle",
  "over_the_shoulder",
  "pov",
] as const;
export type CameraAngle = typeof CAMERA_ANGLES[number];

export const SHOT_TYPES = [
  "extreme_wide",
  "wide",
  "full",
  "medium_wide",
  "medium",
  "medium_close_up",
  "close_up",
  "extreme_close_up",
  "insert",
  "two_shot",
] as const;
export type ShotType = typeof SHOT_TYPES[number];

export const SUBJECT_POSITIONS = [
  "center",
  "left_third",
  "right_third",
  "lower_third",
  "upper_third",
] as const;
export type SubjectPosition = typeof SUBJECT_POSITIONS[number];

export const DEPTH_OF_FIELD = ["shallow", "medium", "deep"] as const;
export type DepthOfField = typeof DEPTH_OF_FIELD[number];

export interface CameraState {
  movement: CameraMovement;
  movement_speed: number;          // 0 = still, 1 = whip/maximum
  angle: CameraAngle;
  shot_type: ShotType;
  composition: {
    subject_position: SubjectPosition;
    depth_of_field: DepthOfField;
    headroom: number;              // 0 = tight crop, 1 = maximum space
    look_room: number;             // 0 = no lead space, 1 = maximum
  };
}

// ---------------------------------------------------------------------------
// Lighting
// ---------------------------------------------------------------------------

export const LIGHT_ROLES = [
  "key", "fill", "back", "rim", "ambient", "practical",
] as const;
export type LightRole = typeof LIGHT_ROLES[number];

export const LIGHT_QUALITIES = [
  "hard", "soft",
] as const;
export type LightQuality = typeof LIGHT_QUALITIES[number];

export const LIGHT_DIRECTIONS = [
  "front",
  "three_quarter_left", "three_quarter_right",
  "side_left", "side_right",
  "back",
  "top",
  "under",
] as const;
export type LightDirection = typeof LIGHT_DIRECTIONS[number];

export interface LightSource {
  role: LightRole;
  quality: LightQuality;
  direction: LightDirection;
  intensity: number;               // 0 = off, 1 = full
  color_temp_k: number;            // Kelvin, e.g. 3200
}

export const LIGHTING_STYLES = [
  "high_key",
  "low_key",
  "chiaroscuro",
  "motivated",
  "natural",
  "silhouette",
] as const;
export type LightingStyle = typeof LIGHTING_STYLES[number];

export const TIMES_OF_DAY = [
  "dawn",
  "golden_hour_morning",
  "midday",
  "overcast",
  "golden_hour_evening",
  "dusk",
  "night",
  "candlelight",
] as const;
export type TimeOfDay = typeof TIMES_OF_DAY[number];

export interface LightingState {
  sources: LightSource[];
  style: LightingStyle;
  time_of_day: TimeOfDay;
  color_temp_k: number;            // dominant / overall Kelvin
  contrast_ratio: number;          // e.g. 4 means 4:1 key-to-fill
}

// ---------------------------------------------------------------------------
// Character
// ---------------------------------------------------------------------------

export interface CharacterState {
  id: string;                      // "marcus", "the woman in red", "subject"
  emotional_state: string;         // freeform — "grief", "quiet rage", "joy breaking through"
  emotional_intensity: number;     // 0 = suppressed, 1 = full expression
  action: string;                  // "turns away from the window"
  blocking: string;                // position/movement in scene space
  is_speaking: boolean;
  dialogue: string;                // current line if speaking
  performance_note: string;        // "play the decision, not the emotion"
}

// ---------------------------------------------------------------------------
// Scene flow
// ---------------------------------------------------------------------------

export const FLOW_CONTROLS = [
  "action",        // scene is running
  "cut",           // end current take
  "hold",          // freeze current moment
  "resume",        // continue from hold
  "slow_down",     // reduce pacing
  "speed_up",      // increase pacing
  "new_take",      // restart from top
  "playback",      // review output
  "lock",          // approve current output as final
] as const;
export type FlowControl = typeof FLOW_CONTROLS[number];

// ---------------------------------------------------------------------------
// Environment
// ---------------------------------------------------------------------------

export const ENVIRONMENT_MODES = ["camera", "imagined"] as const;
export type EnvironmentMode = typeof ENVIRONMENT_MODES[number];

export interface EnvironmentState {
  mode: EnvironmentMode;
  description: string;             // freeform setting description
  weather: string;                 // "rain", "fog", "clear", "snow"
  time_period: string;             // "contemporary", "1940s", "far future"
  interior_exterior: "interior" | "exterior" | "mixed";
}

// ---------------------------------------------------------------------------
// Transition
// ---------------------------------------------------------------------------

export const TRANSITION_TYPES = [
  "cut",           // instant switch
  "dissolve",      // cross-fade
  "fade_to_black",
  "fade_from_black",
  "wipe",
  "match_cut",
] as const;
export type TransitionType = typeof TRANSITION_TYPES[number];

export interface TransitionState {
  type: TransitionType;
  duration_seconds: number;        // 0 for hard cut
}

// ---------------------------------------------------------------------------
// SceneDescription — the top-level interchange type
// ---------------------------------------------------------------------------

export interface SceneDescription {
  version: "0.1";

  camera: CameraState;
  lighting: LightingState;
  characters: CharacterState[];
  environment: EnvironmentState;

  mood: string;                    // overall scene emotional tone
  mood_intensity: number;          // 0 = neutral, 1 = extreme

  flow_control: FlowControl;

  transition?: TransitionState;    // present when transitioning between scenes

  direction_notes: string;         // freeform director intent / meta

  timestamp_ms: number;            // when this description was produced
  sequence_num: number;            // tick number within session
}

// ---------------------------------------------------------------------------
// Defaults — a neutral starting scene
// ---------------------------------------------------------------------------

export const DEFAULT_CAMERA: CameraState = {
  movement: "static",
  movement_speed: 0,
  angle: "eye_level",
  shot_type: "medium",
  composition: {
    subject_position: "center",
    depth_of_field: "medium",
    headroom: 0.5,
    look_room: 0.5,
  },
};

export const DEFAULT_LIGHTING: LightingState = {
  sources: [
    { role: "key", quality: "soft", direction: "three_quarter_right", intensity: 0.8, color_temp_k: 5500 },
    { role: "fill", quality: "soft", direction: "three_quarter_left", intensity: 0.4, color_temp_k: 5500 },
  ],
  style: "natural",
  time_of_day: "midday",
  color_temp_k: 5500,
  contrast_ratio: 2,
};

export const DEFAULT_ENVIRONMENT: EnvironmentState = {
  mode: "imagined",
  description: "",
  weather: "clear",
  time_period: "contemporary",
  interior_exterior: "interior",
};

export const DEFAULT_SCENE: SceneDescription = {
  version: "0.1",
  camera: DEFAULT_CAMERA,
  lighting: DEFAULT_LIGHTING,
  characters: [],
  environment: DEFAULT_ENVIRONMENT,
  mood: "neutral",
  mood_intensity: 0.5,
  flow_control: "action",
  direction_notes: "",
  timestamp_ms: 0,
  sequence_num: 0,
};

// ===========================================================================
// Schema v0.2 — Two-Layer: Session Context + Per-Beat
// ===========================================================================

// ---------------------------------------------------------------------------
// Style Guide
// ---------------------------------------------------------------------------

export interface ColorPalette {
  primary: string[];
  accent: string[];
  description: string;
}

export interface StyleGuide {
  visual_style: string;
  photography_style?: string;
  color_palette: ColorPalette;
  material_vocabulary: string[];
  global_negative_prompts: string[];
}

// ---------------------------------------------------------------------------
// Character Registry
// ---------------------------------------------------------------------------

export interface VisualAnchor {
  item: string;
  required: boolean;
}

export interface CharacterDefinition {
  id: string;
  name: string;
  description: string;
  scale?: string;
  visual_anchors: VisualAnchor[];
  default_emotion: string;
}

// ---------------------------------------------------------------------------
// Location Registry
// ---------------------------------------------------------------------------

export interface LocationDefinition {
  id: string;
  name: string;
  description: string;
  materials: string[];
  established_lighting?: string;
}

// ---------------------------------------------------------------------------
// Drift Repair
// ---------------------------------------------------------------------------

export interface DriftRepair {
  failure_mode: string;
  correction: string;
}

// ---------------------------------------------------------------------------
// Consistency Anchors
// ---------------------------------------------------------------------------

export interface ConsistencyAnchors {
  character_rules: string[];
  material_rules: string[];
  style_rules: string[];
  prohibitions: string[];
}

// ---------------------------------------------------------------------------
// Session Context (Layer 1) — established once, evolves slowly
// ---------------------------------------------------------------------------

export interface SessionContext {
  version: "0.2";
  session_id: string;
  created_at: number;

  title?: string;
  world_description: string;

  style: StyleGuide;
  characters: CharacterDefinition[];
  locations: LocationDefinition[];
  anchors: ConsistencyAnchors;
  drift_repairs: DriftRepair[];
}

// ---------------------------------------------------------------------------
// Per-Beat Character + Environment (v0.2 — reference registries)
// ---------------------------------------------------------------------------

export interface CharacterBeatState {
  character_ref: string;
  emotional_state: string;
  emotional_intensity: number;
  action: string;
  blocking: string;
  is_speaking: boolean;
  dialogue: string;
  performance_note: string;
}

export interface EnvironmentBeatState {
  location_ref?: string;
  mode: EnvironmentMode;
  description: string;
  weather: string;
  time_period: string;
  interior_exterior: "interior" | "exterior" | "mixed";
}

// ---------------------------------------------------------------------------
// Beat Description (Layer 2) — produced every interpretation tick
// ---------------------------------------------------------------------------

export interface BeatDescription {
  version: "0.2";
  session_id: string;
  beat_id: string;
  sequence_num: number;
  timestamp_ms: number;
  duration_seconds?: number;

  camera: CameraState;
  lighting: LightingState;
  characters: CharacterBeatState[];
  environment: EnvironmentBeatState;

  mood: string;
  mood_intensity: number;

  flow_control: FlowControl;
  transition?: TransitionState;

  negative_prompts: string[];
  direction_notes: string;
}

// ---------------------------------------------------------------------------
// v0.2 Defaults
// ---------------------------------------------------------------------------

export const DEFAULT_SESSION_CONTEXT: SessionContext = {
  version: "0.2",
  session_id: "",
  created_at: 0,
  world_description: "",
  style: {
    visual_style: "",
    color_palette: { primary: [], accent: [], description: "" },
    material_vocabulary: [],
    global_negative_prompts: [],
  },
  characters: [],
  locations: [],
  anchors: {
    character_rules: [],
    material_rules: [],
    style_rules: [],
    prohibitions: [],
  },
  drift_repairs: [],
};

export const DEFAULT_BEAT: BeatDescription = {
  version: "0.2",
  session_id: "",
  beat_id: "",
  sequence_num: 0,
  timestamp_ms: 0,
  camera: DEFAULT_CAMERA,
  lighting: DEFAULT_LIGHTING,
  characters: [],
  environment: {
    mode: "imagined",
    description: "",
    weather: "clear",
    time_period: "contemporary",
    interior_exterior: "interior",
  },
  mood: "neutral",
  mood_intensity: 0.5,
  flow_control: "action",
  negative_prompts: [],
  direction_notes: "",
};

// ===========================================================================
// Schema v0.3 — Character Interactions, Modes, Reference Images (ADR-006)
// ===========================================================================

// ---------------------------------------------------------------------------
// Character Modes (v0.3)
// ---------------------------------------------------------------------------

export interface CharacterMode {
  id: string;
  name: string;
  description: string;
  visual_delta: string;
}

export interface CharacterDefinitionV3 {
  id: string;
  name: string;
  description: string;
  scale?: string;
  visual_anchors: VisualAnchor[];
  default_emotion: string;
  modes?: CharacterMode[];
  default_mode?: string;
}

// ---------------------------------------------------------------------------
// Interactions (v0.3)
// ---------------------------------------------------------------------------

export const INTERACTION_TYPES = [
  "combat",
  "conversation",
  "physical_contact",
  "chase",
  "standoff",
  "collaboration",
  "observation",
] as const;
export type InteractionType = typeof INTERACTION_TYPES[number];

export interface Interaction {
  participants: string[];
  type: InteractionType;
  choreography: string;
  dominance?: string;
  props?: string[];
}

// ---------------------------------------------------------------------------
// Reference Images (v0.3)
// ---------------------------------------------------------------------------

export const REFERENCE_ANCHOR_TYPES = [
  "style",
  "pose",
  "composition",
  "continuity",
] as const;
export type ReferenceAnchorType = typeof REFERENCE_ANCHOR_TYPES[number];

export interface ReferenceImage {
  url?: string;
  data_uri?: string;
  anchor_type: ReferenceAnchorType;
  description: string;
}

// ---------------------------------------------------------------------------
// Structured Dialogue (v0.3)
// ---------------------------------------------------------------------------

export interface DialogueLine {
  speaker_ref: string;
  line: string;
  delivery_note?: string;
}

// ---------------------------------------------------------------------------
// Narrative Function (v0.3)
// ---------------------------------------------------------------------------

export const NARRATIVE_FUNCTIONS = [
  "setup",
  "development",
  "turn",
  "resolution",
] as const;
export type NarrativeFunction = typeof NARRATIVE_FUNCTIONS[number];

// ---------------------------------------------------------------------------
// Character Beat State v0.3 — adds mode reference
// ---------------------------------------------------------------------------

export interface CharacterBeatStateV3 {
  character_ref: string;
  active_mode?: string;
  emotional_state: string;
  emotional_intensity: number;
  action: string;
  blocking: string;
  is_speaking: boolean;
  dialogue: string;
  performance_note: string;
}

// ---------------------------------------------------------------------------
// Session Context v0.3
// ---------------------------------------------------------------------------

export interface SessionContextV3 {
  version: "0.3";
  session_id: string;
  created_at: number;

  title?: string;
  world_description: string;

  style: StyleGuide;
  characters: CharacterDefinitionV3[];
  locations: LocationDefinition[];
  anchors: ConsistencyAnchors;
  drift_repairs: DriftRepair[];
}

// ---------------------------------------------------------------------------
// Beat Description v0.3
// ---------------------------------------------------------------------------

export interface BeatDescriptionV3 {
  version: "0.3";
  session_id: string;
  beat_id: string;
  sequence_num: number;
  timestamp_ms: number;
  duration_seconds?: number;

  narrative_function?: NarrativeFunction;

  camera: CameraState;
  lighting: LightingState;
  characters: CharacterBeatStateV3[];
  interactions: Interaction[];
  environment: EnvironmentBeatState;

  mood: string;
  mood_intensity: number;

  flow_control: FlowControl;
  transition?: TransitionState;

  dialogue_lines: DialogueLine[];
  reference_images: ReferenceImage[];
  negative_prompts: string[];
  direction_notes: string;
}

// ---------------------------------------------------------------------------
// v0.3 Defaults
// ---------------------------------------------------------------------------

export const DEFAULT_SESSION_CONTEXT_V3: SessionContextV3 = {
  version: "0.3",
  session_id: "",
  created_at: 0,
  world_description: "",
  style: {
    visual_style: "",
    color_palette: { primary: [], accent: [], description: "" },
    material_vocabulary: [],
    global_negative_prompts: [],
  },
  characters: [],
  locations: [],
  anchors: {
    character_rules: [],
    material_rules: [],
    style_rules: [],
    prohibitions: [],
  },
  drift_repairs: [],
};

export const DEFAULT_BEAT_V3: BeatDescriptionV3 = {
  version: "0.3",
  session_id: "",
  beat_id: "",
  sequence_num: 0,
  timestamp_ms: 0,
  camera: DEFAULT_CAMERA,
  lighting: DEFAULT_LIGHTING,
  characters: [],
  interactions: [],
  environment: {
    mode: "imagined",
    description: "",
    weather: "clear",
    time_period: "contemporary",
    interior_exterior: "interior",
  },
  mood: "neutral",
  mood_intensity: 0.5,
  flow_control: "action",
  dialogue_lines: [],
  reference_images: [],
  negative_prompts: [],
  direction_notes: "",
};
