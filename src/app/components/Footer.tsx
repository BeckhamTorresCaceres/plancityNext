export default function Footer() {
  return (
    <footer className="w-full h-16 bg-black border-t border-gray-400 flex items-center justify-center px-6 text-gray-500 text-sm">
      <p>&copy; {new Date().getFullYear()}  PlanCity. Todos los derechos reservados.</p>
    </footer>
  );
}