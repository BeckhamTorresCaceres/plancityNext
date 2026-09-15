import { Category, Event } from "../interfaces/type";

export const categories: Category[] = [
  {
    id: "1",
    name: "Miniteka",
    description: "como si fuera una discoteca pero pequeña",
  },
  {
    id: "2",
    name: "Music",
    description: "Live concerts, DJ sets, and electronic festivals",
  },
  {
    id: "3",
    name: "Sports",
    description: "Marathons, tournaments, and outdoor athletic events",
  },
  {
    id: "4",
    name: "Food & Drink",
    description: "Carnivals, street food, and culinary experiences",
  },
  {
    id: "5",
    name: "Tech",
    description: "Developer conferences, AI summits, and innovation hubs",
  },
];

export const events: Event[] = [
  {
    id: "1",
    name: "Miniteka donde One",
    description: "celébralo mi hermano",
    date: "19/05/26",
    location: "Barranquilla / La Chinita",
    price: 1000,
    capacity: 50,
    categoryId: "1",
    images: [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=500&fit=crop&auto=format"
    ],
  },
  {
    id: "2",
    name: "Neon Nights Electronic Festival",
    description: "Immersive lights, bass, and underground techno beats.",
    date: "18/10/26",
    location: "Warehouse 23, Berlin",
    price: 45,
    capacity: 2400,
    categoryId: "2",
    images: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=500&fit=crop&auto=format"
    ],
  },
  {
    id: "3",
    name: "City Marathon 2026",
    description: "Join thousands of runners across the city tracks.",
    date: "25/10/26",
    location: "Central Park, New York",
    price: 80,
    capacity: 15000,
    categoryId: "3",
    images: [
      "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&h=500&fit=crop&auto=format"
    ],
  },
  {
    id: "4",
    name: "Street Food Carnival",
    description: "A showcase of local flavors and international street bites.",
    date: "22/10/26",
    location: "Riverside Plaza, London",
    price: 12,
    capacity: 3200,
    categoryId: "4",
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=500&fit=crop&auto=format"
    ],
  },
  {
    id: "5",
    name: "AI & Future Cities Summit",
    description: "Discussions on urban tech advancements and smart infrastructure.",
    date: "05/11/26",
    location: "Innovation Hub, San Francisco",
    price: 150,
    capacity: 600,
    categoryId: "5",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop&auto=format"
    ],
  },
  {
    id: "6",
    name: "Rooftop Jazz Sessions",
    description: "Smooth evening melodies under the open sky.",
    date: "19/10/26",
    location: "SkyBar Rooftop, Chicago",
    price: 35,
    capacity: 420,
    categoryId: "2",
    images: [
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=500&fit=crop&auto=format"
    ],
  },
];