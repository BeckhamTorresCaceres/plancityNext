interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  img: string;
  title: string;
  description: string;
  categoria: Category["id"]; // Equivalente a number
}

interface ProductCardProps {
  product: Product;
  categoryName?: string; // Opcional, por si quieres mostrar el nombre en lugar del ID
}