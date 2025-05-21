import { defineConfig } from "drizzle-kit";
import fs from "node:fs";
import path from "node:path";
import { env } from "~/env";

function getLocalD1DB() {
  try {
    const basePath = path.resolve(".wrangler");
    const dbFile = fs
      .readdirSync(basePath, { encoding: "utf-8", recursive: true })
      .find((f) => f.endsWith(".sqlite"));

    if (!dbFile) {
      throw new Error(`.sqlite file not found in ${basePath}`);
    }

    const url = path.resolve(basePath, dbFile);
    return url;
  } catch (err: unknown) {
    console.log(`Error getting local D1 DB: ${String(err)}`);
  }
}

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  ...(process.env.NODE_ENV === "production"
    ? {
        driver: "d1-http",
        dbCredentials: {
          accountId: env.CLOUDFLARE_D1_ACCOUNT_ID,
          databaseId: env.CLOUDFLARE_DATABASE_ID,
          token: env.CLOUDFLARE_D1_API_TOKEN,
        },
      }
    : {
        dbCredentials: {
          url: getLocalD1DB(),
        },
      }),
});
