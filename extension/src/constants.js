const BASE_PREFIX = process.env.NODE_ENV === "development" ? "DEV_" : "";

export const AUTH_TOKEN_FIELD = BASE_PREFIX + "PUPCKET_AUTH_TOKEN";
export const MOMENTS_STORAGE_FIELD = BASE_PREFIX + "PUPCKET_MOMENTS";
