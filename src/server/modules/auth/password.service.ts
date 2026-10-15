import { randomBytes } from "node:crypto";
import argon2 from "argon2";

const ARGON2_OPTIONS: argon2.HashOptions = {
  // argon2 exposes numeric enum values at runtime but its current typings
  // incorrectly describe the key as a string numeric index.
  type: argon2.argon2id as unknown as argon2.HashOptions["type"],
  memoryCost: 19_456,
  timeCost: 2,
  parallelism: 1,
};

export function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, ARGON2_OPTIONS);
}

const dummyHash = hashPassword(randomBytes(32).toString("hex"));

export async function verifyPassword(
  password: string,
  passwordHash: string | null,
): Promise<boolean> {
  const hash = passwordHash ?? (await dummyHash);
  try {
    const matches = await argon2.verify(hash, password);
    return Boolean(passwordHash) && matches;
  } catch {
    return false;
  }
}
