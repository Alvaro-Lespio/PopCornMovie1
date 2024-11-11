import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { Pelicula } from '../interface/pelicula.interface';

interface ApiResponse {
  results: Pelicula[];  // La propiedad 'results' contiene el arreglo de películas
}

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
http = inject(HttpClient)
urlBase = environment.tmdbBaseUrl
apiKey = environment.tmdbApiKey

//generos por id en api
generos: { [key: string]: number } = {
  Accion: 28,
  Aventura: 12,
  Animacion: 16,
  Comedia: 35,
  Crimen: 80,
  Documental: 99,
  Drama: 18,
  Familia: 10751,
  Fantasia: 14,
  Historia: 36,
  Terror: 27,
  Musica: 10402,
  Misterio: 9648,
  Romance: 10749,
  CienciaFiccion: 878,
  Suspenso: 53,
  Guerra: 10752,
  Western: 37
};

//listado de peliculas populares
getPeliculasPopulares(): Observable<Pelicula[]>{
  return this.http.get<ApiResponse>(`${this.urlBase}/movie/popular?api_key=${this.apiKey}&language=es`)
  .pipe(map(response=>response.results));
}
// Películas en cartelera
getPeliculasEnCartelera(): Observable<Pelicula[]> {
  return this.http.get<ApiResponse>(`${this.urlBase}/movie/now_playing?api_key=${this.apiKey}&language=es`)
  .pipe(map(response => response.results));
}

// Películas mejor calificadas
getPeliculasMejorCalificadas(): Observable<Pelicula[]> {
  return this.http.get<ApiResponse>(`${this.urlBase}/movie/top_rated?api_key=${this.apiKey}&language=es`)
  .pipe(map(response => response.results));
}

// Próximos estrenos
getPeliculasProximas(): Observable<Pelicula[]> {
  return this.http.get<ApiResponse>(`${this.urlBase}/movie/upcoming?api_key=${this.apiKey}&language=es`)
  .pipe(map(response => response.results));
}

  //Obtener detalles de una pelicula por ID
  // getPeliculaById(id: number): Observable<Pelicula>{
  //   return this.http.get<Pelicula>(`${this.urlBase}/movie/${id}?api_key=${this.apiKey}`)
  // }
  getPeliculaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/movie/${id}?api_key=${this.apiKey}&language=es`);
  }

  //Buscar pelicula por palabra clave
  buscarPelicula(query: string): Observable<Pelicula[]>{
    return this.http.get<ApiResponse>(`${this.urlBase}/search/movie?api_key=${this.apiKey}&query=${query}&language=es`)
    .pipe(map(response => response.results));
  }

  // Método para obtener el ID del género por su nombre
  obtenerIdGenero(nombreGenero: string): number | undefined {
    return this.generos[nombreGenero];
  }

  //filtrar peliculas por genero, año o popularidad
  filtrarPeliculas(filtros: { genero?: string; año?: string; popularidad?: string }): Observable<Pelicula[]> {
    let url = `${this.urlBase}/discover/movie?api_key=${this.apiKey}&language=es`;
  
    // Verifica y convierte el género a su ID si corresponde
    const generoId = filtros.genero ? this.obtenerIdGenero(filtros.genero) : undefined;
  
    if (generoId) {
      url += `&with_genres=${generoId}`;
    }
    if (filtros.año) {
      url += `&primary_release_year=${filtros.año}`;
    }
    if (filtros.popularidad) {
      url += `&sort_by=${filtros.popularidad}`;
    }
  
    return this.http.get<ApiResponse>(url)
      .pipe(map(response => response.results));
  }

  
}
