import { categories, events } from "../data/events.data";

export async function getEvents() {
  return events;
}

export async function getCategories() {
  return categories;
}
