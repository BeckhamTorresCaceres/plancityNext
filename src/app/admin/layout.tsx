import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex bg-page text-fg theme-transition">
      <aside className="w-56 shrink-0 border-r border-fg/10 bg-page theme-transition p-4">
        <h2 className="mb-6 text-lg font-semibold text-fg">Panel Admin</h2>
        <nav className="flex flex-col gap-2 text-muted">
          <Link href="/admin" className="theme-transition hover:text-fg hover:underline">
            Inicio
          </Link>
          <Link href="/admin/events" className="theme-transition hover:text-fg hover:underline">
            Eventos
          </Link>
          <Link href="/admin/users" className="theme-transition hover:text-fg hover:underline">
            Usuarios
          </Link>
        </nav>
      </aside>

      <section className="flex-1 p-6">{children}</section>
    </div>
  );
}