type RecordValue=Record<string,unknown>;
const malformed=(field:string):never=>{throw new Error(`MALFORMED_RESPONSE: ${field}`)};
const unwrap=(value:unknown,field:string,depth=0):unknown=>{if(depth>3)malformed(field);if(!value||typeof value!=="object"||Array.isArray(value))return value;const record=value as RecordValue;for(const key of ["value","raw","data","result"]){if(Object.prototype.hasOwnProperty.call(record,key))return unwrap(record[key],field,depth+1)}malformed(field)};
export function decodeU256(value:unknown,field:string):string{const raw=unwrap(value,field);if(typeof raw==="bigint"&&raw>=0n)return raw.toString();if(typeof raw==="number"&&Number.isSafeInteger(raw)&&raw>=0)return String(raw);if(typeof raw==="string"&&/^(0|[1-9]\d*)$/.test(raw))return raw;return malformed(field)}
export function decodeU8(value:unknown,field:string):number{const decoded=decodeU256(value,field);const number=Number(decoded);if(number<=255)return number;return malformed(field)}
export function decodeAddress(value:unknown,field:string):string{const raw=unwrap(value,field);if(typeof raw==="string"&&/^0x[0-9a-fA-F]{40}$/.test(raw))return raw;return malformed(field)}
export function decodeString(value:unknown,field:string):string{const raw=unwrap(value,field);if(typeof raw==="string")return raw;return malformed(field)}
export function decodeScalarString(value:unknown,field:string):string{const raw=unwrap(value,field);if(typeof raw==="string")return raw;if(typeof raw==="number"&&Number.isFinite(raw))return String(raw);if(typeof raw==="bigint")return raw.toString();return malformed(field)}
export function decodeBool(value:unknown,field:string):boolean{const raw=unwrap(value,field);if(typeof raw==="boolean")return raw;if(raw===0||raw===0n)return false;if(raw===1||raw===1n)return true;return malformed(field)}
export function decodeJsonString(value:unknown,field:string):string{const text=decodeString(value,field);try{JSON.parse(text)}catch{return malformed(field)}return text}
export function decodeObject(value:unknown,field:string):RecordValue{if(!value||typeof value!=="object"||Array.isArray(value))return malformed(field);return value as RecordValue}
