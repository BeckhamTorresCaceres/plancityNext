export default function Footer() {
  return (
    <footer className="theme-transition flex h-16 w-full items-center justify-center bg-footer px-6 text-sm text-muted">
      <p>
        &copy;
        {new Date().getFullYear()}
        PlanCity. Todos los derechos reservados.
      </p>
    </footer>
  );
}
