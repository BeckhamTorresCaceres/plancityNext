import AdminLayout from "@/features/admin/components/AdminLayout";

export default function AdminRouteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AdminLayout>{children}</AdminLayout>;
}
