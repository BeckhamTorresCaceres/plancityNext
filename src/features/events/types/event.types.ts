export interface Category {
  id: string;
  name: string;
  description: string;
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
  images: string[];
}

export interface CardEventProps {
  event: Event;
  categoryName?: string;
}

export interface EventExplorerProps {
  events: Event[];
  categories: Category[];
}

export interface CategoryFilterProps {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export interface EventPosterProps {
  event: Event;
  category?: Category;
}

export interface EventInfoCardsProps {
  event: Event;
}

export interface BackButtonProps {
  label?: string;
}

export interface EventFilters {
  query: string;
  selectedCategoryId: string;
}
