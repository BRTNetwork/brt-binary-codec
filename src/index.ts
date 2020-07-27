import * as assert from "assert";
import { quality, binary } from "./coretypes";
import { decodeLedgerData } from "./ledger-hashes";
import { ClaimObject } from "./binary";
import { JsonObject } from "./types/serialized-type";
const {
  signingData,
  signingClaimData,
  multiSigningData,
  binaryToJSON,
  serializeObject,
} = binary;

function decode(binary: string): JsonObject {
  assert(typeof binary === "string", "binary must be a hex string");
  return binaryToJSON(binary);
}

function encode(json: string): string {
  assert(typeof json === "object");
  return serializeObject(json).toString("hex").toUpperCase();
}

function encodeForSigning(json: JsonObject): string {
  assert(typeof json === "object");
  return signingData(json).toString("hex").toUpperCase();
}

function encodeForSigningClaim(json: ClaimObject): string {
  assert(typeof json === "object");
  return signingClaimData(json).toString("hex").toUpperCase();
}

function encodeForMultisigning(json: JsonObject, signer: string): string {
  assert(typeof json === "object");
  assert.equal(json.SigningPubKey, "");
  return multiSigningData(json, signer).toString("hex").toUpperCase();
}

function encodeQuality(value: string): string {
  assert(typeof value === "string");
  return quality.encode(value).toString("hex").toUpperCase();
}

function decodeQuality(value: string): string {
  assert(typeof value === "string");
  return quality.decode(value).toString();
}

export {
  decode,
  encode,
  encodeForSigning,
  encodeForSigningClaim,
  encodeForMultisigning,
  encodeQuality,
  decodeQuality,
  decodeLedgerData,
};
