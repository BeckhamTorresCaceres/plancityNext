import { getPrisma } from "@/server/db/prisma";
import { hashPassword, verifyPassword } from "./password.service";
import { createSession, hashSessionToken } from "./session.service";

export type SafeUser = {
  id: string;
  name: string;
  email: string | null;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED";
  avatar_url: string | null;
};

function safeUser(user: {
  id: string;
  name: string;
  email: string | null;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED";
  avatar_url: string | null;
}): SafeUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    avatar_url: user.avatar_url,
  };
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
}): Promise<boolean> {
  const passwordHash = await hashPassword(input.password);

  try {
    await getPrisma().users.create({
      data: {
        name: input.name,
        email: input.email,
        password_credentials: {
          create: { password_hash: passwordHash },
        },
      },
    });
    return true;
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      // Keep duplicate registration responses indistinguishable from success.
      return false;
    }
    throw error;
  }
}

export async function loginUser(input: {
  email: string;
  password: string;
}): Promise<{ user: SafeUser; token: string; expiresAt: Date } | null> {
  const db = getPrisma();
  const user = await db.users.findFirst({
    where: { email: { equals: input.email, mode: "insensitive" } },
    include: { password_credentials: true },
  });

  const validPassword = await verifyPassword(
    input.password,
    user?.password_credentials?.password_hash ?? null,
  );

  if (!user || !validPassword || user.status !== "ACTIVE") return null;

  const session = await createSession(user.id);
  return { user: safeUser(user), ...session };
}

export async function getSessionUser(token: string): Promise<SafeUser | null> {
  const session = await getPrisma().sessions.findUnique({
    where: { token_hash: hashSessionToken(token) },
    include: { users: true },
  });

  if (
    !session ||
    session.revoked_at ||
    session.expires_at <= new Date() ||
    session.users.status !== "ACTIVE"
  ) {
    return null;
  }

  return safeUser(session.users);
}
