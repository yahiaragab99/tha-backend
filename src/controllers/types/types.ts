import "express-session";

declare module "express-session" {
  export interface SessionData {
    userId: string;
  }
  export interface Session {
    userId?: string;
  }
}

export {};
