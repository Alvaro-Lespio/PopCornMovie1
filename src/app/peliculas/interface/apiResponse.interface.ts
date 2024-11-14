import { Pelicula } from "./pelicula.interface";

export interface ApiResponse {
  results: Pelicula[];  
  total_results: number;
  total_pages: number;
  page: number;
}
