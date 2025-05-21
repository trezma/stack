import { initAuth } from "~/auth";

export async function POST(req: Request) {
  const auth = await initAuth();
  return auth.handler(req);
}

export async function GET(req: Request) {
  const auth = await initAuth();
  return auth.handler(req);
}

export async function OPTIONS(req: Request) {
  const auth = await initAuth();
  return auth.handler(req);
}

export async function DELETE(req: Request) {
  const auth = await initAuth();
  return auth.handler(req);
}

export async function PATCH(req: Request) {
  const auth = await initAuth();
  return auth.handler(req);
}

export async function PUT(req: Request) {
  const auth = await initAuth();
  return auth.handler(req);
}
