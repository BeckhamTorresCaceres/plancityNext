"use client";
import { useMemo, useState } from "react";
import type { User } from "../types/user.types";
export function useUsers(initialUsers: User[]) {
  const [search, setSearch] = useState("");
  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return initialUsers;
    return initialUsers.filter((user) =>
      `${user.name} ${user.email}`.toLowerCase().includes(query),
    );
  }, [initialUsers, search]);
  return { search, setSearch, filteredUsers };
}
