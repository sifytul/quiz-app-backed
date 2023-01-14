export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: number;
      MONGO_URI: string;
      ENV: "test" | "dev" | "prod";
      PORT: number;
    }
  }
}
