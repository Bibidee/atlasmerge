export const STUDIO_CHAIN_ID = 61999;
export const config = {
  endpoint: process.env.NEXT_PUBLIC_GENLAYER_ENDPOINT ?? "https://studio.genlayer.com/api",
  contractAddress: process.env.NEXT_PUBLIC_ATLASMERGE_CONTRACT?.trim() ?? "",
  explorer: "https://explorer-studio.genlayer.com",
  isConfigured: Boolean(process.env.NEXT_PUBLIC_ATLASMERGE_CONTRACT?.trim()),
};
