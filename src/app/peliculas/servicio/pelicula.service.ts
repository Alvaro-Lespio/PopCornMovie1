import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Pelicula } from '../interface/pelicula.interface';

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
  return this.http.get<Pelicula[]>(`${this.urlBase}/movie/popular?api_key=${this.apiKey}`);
}
// Películas en cartelera
getPeliculasEnCartelera(): Observable<Pelicula[]> {
  return this.http.get<Pelicula[]>(`${this.urlBase}/movie/now_playing?api_key=${this.apiKey}`);
}

// Películas mejor calificadas
getPeliculasMejorCalificadas(): Observable<Pelicula[]> {
  return this.http.get<Pelicula[]>(`${this.urlBase}/movie/top_rated?api_key=${this.apiKey}`);
}

// Próximos estrenos
getPeliculasProximas(): Observable<Pelicula[]> {
  return this.http.get<Pelicula[]>(`${this.urlBase}/movie/upcoming?api_key=${this.apiKey}`);
}

  //Obtener detalles de una pelicula por ID
  getPeliculaById(id: string): Observable<Pelicula>{
    return this.http.get<Pelicula>(`${this.urlBase}/movie/${id}?api_key=${this.apiKey}`)
  }

  //Buscar pelicula por palabra clave
  buscarPelicula(query: string): Observable<Pelicula[]>{
    return this.http.get<Pelicula[]>(`${this.urlBase}/search/movie?api_key=${this.apiKey}&query=${query}`)
  }

  //filtrar peliculas por genero, año o popularidad
  filtrarPeliculas(filtros: { genero?: number; año?: string; popularidad?: string }): Observable<Pelicula[]> {
    let url = `${this.urlBase}/discover/movie?api_key=${this.apiKey}`;

    // Agregar filtros a la URL si están presentes
    if (filtros.genero) {
      url += `&with_genres=${filtros.genero}`;
    }
    if (filtros.año) {
      url += `&primary_release_year=${filtros.año}`;
    }
    if (filtros.popularidad) {
      url += `&sort_by=${filtros.popularidad}`;
    }

    return this.http.get<Pelicula[]>(url);
  }
}