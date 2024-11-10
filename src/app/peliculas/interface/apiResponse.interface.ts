import { Pelicula } from "./pelicula.interface";

export interface ApiResponse {
  results: Pelicula[];  // Aquí está el arreglo de películas que queremos
  total_results: number;
  total_pages: number;
  page: number;
}
