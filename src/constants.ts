export const __prod__ = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "hqid";
export const JWT_COOKIE_NAME = "jwt";
export const FORGET_PASS_PREFIX = "forget-password:";
export const JWT_EXPIRATION = "1h";
export const MAX_AGE_COOKIE = 10 * 60 * 60 * 24 * 365;
