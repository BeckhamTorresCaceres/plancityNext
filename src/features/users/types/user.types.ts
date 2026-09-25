export type UserStatus = "active" | "suspended";

export interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  joinedAt: string;
}
