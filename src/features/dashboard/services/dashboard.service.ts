import { events } from "@/features/events/data/events.data";
import { users } from "@/features/users/data/users.data";
export async function getDashboardData() {
  return { events, users };
}
