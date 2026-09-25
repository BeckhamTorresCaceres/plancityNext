"use client";

import { Search } from "lucide-react";
import { useUsers } from "../hooks/useUsers";
import { users } from "../data/users.data";

export default function UsersTable() {
  const { search, setSearch, filteredUsers } = useUsers(users);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Users</h2>
        <p className="mt-1 text-sm text-[#8e8e93]">
          Manage registered PlanCity users.
        </p>
      </div>

      <div className="flex max-w-md items-center gap-2 rounded-xl border border-white/8 bg-[#0a0a0a] px-3 py-2.5">
        <Search size={16} className="text-[#8e8e93]" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search users..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#636366]"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#0a0a0a]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/8 text-[#8e8e93]">
            <tr>
              <th className="px-5 py-4 font-medium">Name</th>
              <th className="px-5 py-4 font-medium">Email</th>
              <th className="px-5 py-4 font-medium">Joined</th>
              <th className="px-5 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-white/6 last:border-0"
              >
                <td className="px-5 py-4 font-medium text-white">
                  {user.name}
                </td>
                <td className="px-5 py-4 text-[#8e8e93]">{user.email}</td>
                <td className="px-5 py-4 text-[#8e8e93]">{user.joinedAt}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs ${
                      user.status === "active"
                        ? "bg-[#30d158]/10 text-[#30d158]"
                        : "bg-[#ff453a]/10 text-[#ff453a]"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
