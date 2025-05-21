import { HydrateClient } from "~/trpc/server";

export default async function LandingPage() {
  return (
    <HydrateClient>
      <main className="mb-40 space-y-40">
        <h1>Trezma Stack</h1>
      </main>
    </HydrateClient>
  );
}
