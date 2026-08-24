export function u256Id(value:string): bigint {
  const id=value.trim();
  if(!/^(0|[1-9]\d*)$/.test(id)) throw new Error("INVALID_ENTITY_ID");
  const parsed=BigInt(id);
  if(parsed<0n) throw new Error("INVALID_ENTITY_ID");
  return parsed;
}
