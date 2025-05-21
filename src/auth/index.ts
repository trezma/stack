import { betterAuth } from "better-auth";
import { withCloudflare } from "better-auth-cloudflare";
import { drizzleAdapter, type DB } from "better-auth/adapters/drizzle";
import { env } from "~/env";
import { getDb } from "~/server/db";

// Define an asynchronous function to build your auth configuration
async function authBuilder() {
  const dbInstance = await getDb();
  return betterAuth(
    withCloudflare(
      {
        autoDetectIpAddress: true,
        geolocationTracking: true,
        d1: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
          db: dbInstance as any,
          options: {
            usePlural: true, // Optional: Use plural table names (e.g., "users" instead of "user")
            debugLogs: true, // Optional
          },
        },
      },
      // Your core Better Auth configuration (see Better Auth docs for all options)
      {
        emailAndPassword: {
          enabled: true,
        },
        trustedOrigins: [
          "https://stack.trezma.com",
          "http://localhost:3000",
          "http://localhost:8787",
        ],
      },
    ),
  );
}

// Singleton pattern to ensure a single auth instance
let authInstance: Awaited<ReturnType<typeof authBuilder>> | null = null;

// Asynchronously initializes and retrieves the shared auth instance
export async function initAuth() {
  authInstance ??= await authBuilder();
  return authInstance;
}

/* ======================================================================= */
/* Configuration for Schema Generation                                     */
/* ======================================================================= */

// This simplified configuration is used by the Better Auth CLI for schema generation.
// It includes only the options that affect the database schema.
// It's necessary because the main `authBuilder` performs operations (like `getDb()`)
// which use `getCloudflareContext` (not available in a CLI context only on Cloudflare).
// For more details, see: https://www.answeroverflow.com/m/1362463260636479488
export const auth = betterAuth({
  ...withCloudflare(
    {
      autoDetectIpAddress: true,
      geolocationTracking: true,
      // No actual database or KV instance is needed here, only schema-affecting options
    },
    {
      // Include only configurations that influence the Drizzle schema,
      // e.g., if certain features add tables or columns.
      // socialProviders: { /* ... */ } // If they add specific tables/columns
    },
  ),

  // Used by the Better Auth CLI for schema generation.
  database: drizzleAdapter(env.DATABASE_URL as unknown as DB, {
    provider: "sqlite",
    usePlural: true,
    debugLogs: true,
  }),
});
