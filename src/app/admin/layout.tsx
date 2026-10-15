import { redirect } from "next/navigation";
import AdminLayout from "@/features/admin/components/AdminLayout";
import { isAdmin } from "@/server/security/permissions";
import { getCurrentUser } from "@/server/security/require-user";

export default async function AdminRouteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getCurrentUser();
  if (!user || !isAdmin(user)) redirect("/");

  return <AdminLayout>{children}</AdminLayout>;
}
