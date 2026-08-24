export type CoordinateKind = "latitude" | "longitude";

const DECIMAL_COORDINATE = /^([+-]?)(\d+)(?:\.(\d{1,6}))?$/;

export function coordinateToE6(input: string, kind: CoordinateKind): bigint {
  const value = input.trim();
  const match = DECIMAL_COORDINATE.exec(value);
  if (!match) throw new Error("Coordinates must be decimal numbers with at most 6 decimal places.");
  const [, sign, whole, fraction = ""] = match;
  const magnitude = BigInt(whole) * 1_000_000n + BigInt(fraction.padEnd(6, "0"));
  const e6 = sign === "-" ? -magnitude : magnitude;
  const limit = kind === "latitude" ? 90_000_000n : 180_000_000n;
  if (e6 < -limit || e6 > limit) throw new Error(`${kind === "latitude" ? "Latitude" : "Longitude"} is outside geographic bounds.`);
  return e6;
}

export function bboxToE6(value: {min_lat:string;max_lat:string;min_lng:string;max_lng:string}) {
  const result = {
    min_lat_e6: coordinateToE6(value.min_lat, "latitude"),
    max_lat_e6: coordinateToE6(value.max_lat, "latitude"),
    min_lng_e6: coordinateToE6(value.min_lng, "longitude"),
    max_lng_e6: coordinateToE6(value.max_lng, "longitude"),
  };
  if (result.min_lat_e6 >= result.max_lat_e6 || result.min_lng_e6 >= result.max_lng_e6) {
    throw new Error("Bounding-box minimums must be less than maximums.");
  }
  return result;
}

export function canonicalBboxJson(value: ReturnType<typeof bboxToE6>): string {
  return `{"max_lat_e6":${value.max_lat_e6},"max_lng_e6":${value.max_lng_e6},"min_lat_e6":${value.min_lat_e6},"min_lng_e6":${value.min_lng_e6}}`;
}
