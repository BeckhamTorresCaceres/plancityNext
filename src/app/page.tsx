import Link from "next/link";
import ProductCard from "./components/card";
import { categories, products } from "./data/data";

export default function Home() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Bienvenido al mejor inventario de esta vaina, haz lo que vos querás
      </h1>
      <p className="text-gray-600 font-medium">
        Hecho y recreado por el Beckham
      </p>

      {/* Navegación a otras rutas */}
      <div className="flex gap-4 pt-2">
        <Link 
          href="/products" 
          className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Ver Productos
        </Link>
        <Link 
          href="/categories" 
          className="bg-gray-100 text-gray-900 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Ver Categorías
        </Link>
      </div>
    </div>
  );
}