/**
 * Acupuncture Point Regional Organization
 *
 * Maps acupuncture point codes to their correct anatomical regions
 * based on channel (meridian) and point number ranges.
 */

export interface AcupuncturePoint {
  name: string;
  side: "Left" | "Right" | "Both" | null;
  method: "T" | "R" | "E" | null;
}

export interface AcupunctureRegion {
  region: string;
  points: AcupuncturePoint[];
}

// Channel point ranges and their corresponding regions
const CHANNEL_REGION_MAP: Record<string, [string, string, string][]> = {
  LU: [
    ["1", "2", "Chest"],
    ["3", "4", "Upper Arm"],
    ["5", "9", "Forearm"],
    ["10", "11", "Hand"]
  ],
  LI: [
    ["1", "5", "Hand"],
    ["6", "11", "Forearm"],
    ["12", "15", "Upper Arm"],
    ["16", "16", "Back"],
    ["17", "18", "Neck"],
    ["19", "20", "Face"]
  ],
  ST: [
    ["1", "8", "Face"],
    ["9", "12", "Neck"],
    ["13", "18", "Chest"],
    ["19", "30", "Abdomen"],
    ["31", "34", "Thigh"],
    ["35", "40", "Lower Leg"],
    ["41", "45", "Foot"]
  ],
  SP: [
    ["1", "5", "Foot"],
    ["6", "9", "Lower Leg"],
    ["10", "11", "Thigh"],
    ["12", "12", "Hip"],
    ["13", "16", "Abdomen"],
    ["17", "21", "Chest"]
  ],
  HT: [
    ["1", "2", "Upper Arm"],
    ["3", "7", "Forearm"],
    ["8", "9", "Hand"]
  ],
  SI: [
    ["1", "4", "Hand"],
    ["5", "8", "Forearm"],
    ["9", "10", "Upper Arm"],
    ["11", "15", "Shoulder"],
    ["16", "17", "Neck"],
    ["18", "19", "Face"]
  ],
  BL: [
    ["1", "2", "Face"],
    ["3", "9", "Head"],
    ["10", "10", "Neck"],
    ["11", "25", "Back"],
    ["26", "35", "Hip"],
    ["36", "40", "Thigh"],
    ["41", "52", "Back"],
    ["53", "54", "Hip"],
    ["55", "59", "Lower Leg"],
    ["60", "67", "Foot"]
  ],
  KD: [
    ["1", "6", "Foot"],
    ["7", "10", "Lower Leg"],
    ["11", "11", "Hip"],
    ["12", "21", "Abdomen"],
    ["22", "27", "Chest"]
  ],
  PC: [
    ["1", "1", "Chest"],
    ["2", "2", "Upper Arm"],
    ["3", "7", "Forearm"],
    ["8", "9", "Hand"]
  ],
  SJ: [
    ["1", "4", "Hand"],
    ["5", "9", "Forearm"],
    ["10", "13", "Upper Arm"],
    ["14", "15", "Shoulder"],
    ["16", "16", "Neck"],
    ["17", "20", "Head"],
    ["21", "23", "Face"]
  ],
  GB: [
    ["1", "7", "Face"],
    ["8", "13", "Head"],
    ["14", "14", "Face"],
    ["15", "20", "Head"],
    ["21", "21", "Shoulder"],
    ["22", "23", "Chest"],
    ["24", "26", "Abdomen"],
    ["27", "30", "Hip"],
    ["31", "33", "Thigh"],
    ["34", "39", "Lower Leg"],
    ["40", "44", "Foot"]
  ],
  LV: [
    ["1", "4", "Foot"],
    ["5", "8", "Lower Leg"],
    ["9", "12", "Thigh"],
    ["13", "14", "Abdomen"]
  ],
  REN: [
    ["1", "2", "Hip"],
    ["3", "16", "Abdomen"],
    ["17", "22", "Chest"],
    ["23", "23", "Neck"],
    ["24", "24", "Face"]
  ],
  DU: [
    ["1", "2", "Hip"],
    ["3", "14", "Back"],
    ["15", "16", "Neck"],
    ["17", "24", "Head"],
    ["25", "28", "Face"]
  ]
};

// Common extra points (not on standard channels)
const EXTRA_POINTS: Record<string, string> = {
  "Yin Tang": "Head",
  "Ling Gu": "Hand",
  "Da Bai": "Hand",
  "Tai Yang": "Head",
  "Si Shen Cong": "Head",
  "Qi Men": "Chest",
  "An Mian": "Neck",
  "Bai Lao": "Neck"
};

/**
 * Parse a point code like "BL-20" or "BL20" into channel and number
 */
function parsePointCode(pointName: string): { channel: string; number: string } | null {
  // Normalize: remove spaces, convert to uppercase
  const normalized = pointName.trim().toUpperCase().replace(/\s+/g, "");

  // Try alternative names first: CV (REN), GV (DU)
  if (normalized.startsWith("CV")) {
    const match = normalized.match(/^CV-?(\d+)$/);
    if (match) return { channel: "REN", number: match[1] };
  }
  if (normalized.startsWith("GV")) {
    const match = normalized.match(/^GV-?(\d+)$/);
    if (match) return { channel: "DU", number: match[1] };
  }

  // Try full name: Ren-3, Du-14
  let match = normalized.match(/^(REN|DU)-?(\d+)$/);
  if (match) {
    return { channel: match[1], number: match[2] };
  }

  // Try standard pattern: LV-3, ST-36, BL-20
  match = normalized.match(/^([A-Z]+)-?(\d+)$/);
  if (match) {
    return { channel: match[1], number: match[2] };
  }

  return null;
}

/**
 * Determine the anatomical region for a given point code
 */
function determineRegion(pointName: string): string {
  // Check if it's an extra point
  const extraRegion = EXTRA_POINTS[pointName.trim()];
  if (extraRegion) return extraRegion;

  // Parse the point code
  const parsed = parsePointCode(pointName);
  if (!parsed) {
    console.warn(`[Acupuncture] Could not parse point: "${pointName}"`);
    return "Other";
  }

  const { channel, number } = parsed;
  const ranges = CHANNEL_REGION_MAP[channel];

  if (!ranges) {
    console.warn(`[Acupuncture] Unknown channel: "${channel}" for point "${pointName}"`);
    return "Other";
  }

  // Find the range that contains this point number
  const pointNum = parseInt(number, 10);
  for (const [startStr, endStr, region] of ranges) {
    const start = parseInt(startStr, 10);
    const end = parseInt(endStr, 10);
    if (pointNum >= start && pointNum <= end) {
      return region;
    }
  }

  console.warn(`[Acupuncture] Point ${pointName} not in any range for channel ${channel}`);
  return "Other";
}

/**
 * Organize a flat list of points into regions
 */
export function organizePointsByRegion(points: AcupuncturePoint[]): AcupunctureRegion[] {
  const regionMap = new Map<string, AcupuncturePoint[]>();

  for (const point of points) {
    const region = determineRegion(point.name);

    if (!regionMap.has(region)) {
      regionMap.set(region, []);
    }
    regionMap.get(region)!.push(point);
  }

  // Convert map to array and sort by region name
  const organized = Array.from(regionMap.entries())
    .map(([region, points]) => ({ region, points }))
    .sort((a, b) => a.region.localeCompare(b.region));

  return organized;
}
