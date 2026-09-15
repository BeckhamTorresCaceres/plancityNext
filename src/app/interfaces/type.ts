export interface Category {
  id: string;
  name: string;
  description: string; // Ajustado a inglés para mantener consistencia con el resto de campos
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  price: number;
  capacity: number;
  categoryId: Category["id"];
  images: string[]; // Cambiado a array de strings si vas a manejar múltiples URLs de imágenes
}
export interface CardEventProps {
  event: Event;
  categoryName?: string;
}
