import ProductCard from "@/app/components/card";
import { categories, products } from "@/app/data/data";



export default function pageProducts() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => {
        // Buscamos el nombre de la categoría correspondiente al ID del producto
        const category = categories.find((cat) => cat.id === product.categoria);

        return (
          <ProductCard
            key={product.id} 
            product={product} 
            categoryName={category?.name} 
          />
        );
      })}
    </div>
  );
}