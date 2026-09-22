export default function Footer() {
  return (
    <footer className="theme-transition w-full h-16 bg-footer flex items-center justify-center px-6 text-muted text-sm">
      <p>&copy; {new Date().getFullYear()}  PlanCity. Todos los derechos reservados.</p>
    </footer>
  );
}
