import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../../usuario/interface/Usuario.interface';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../usuario/Service/usuario.service';
import { Playlist } from '../interface/Playlist.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  http = inject(HttpClient);
  usuarioService = inject(UsuarioService)
  baseUrl = "http://localhost:3000/usuarios";

  constructor() { }


  getPlaylistById(userId: string, playlistId: number): Observable<Playlist | null> {
    return new Observable<Playlist | null>((observer) => {
      this.usuarioService.getUsuarioById(userId).subscribe({
        next: (user) => {
          const playlist = user.playlists.find(p => p.id === playlistId);
          
          if (playlist) {
            observer.next(playlist); // Devuelve la playlist encontrada
            observer.complete();
          } else {
            console.error('Playlist no encontrada.');
            observer.error(new Error('Playlist no encontrada.'));
          }
        },
        error: (e: Error) => {
          console.error('Error al obtener el usuario:', e.message);
          observer.error(e);
        }
      });
    });
  }
  
  addMovieToPlaylist(userId: string, playlistId: number, movieId: number): Observable<Usuario> {
    return new Observable<Usuario>((observer) => {
      this.usuarioService.getUsuarioById(userId).subscribe({
        next: (user) => {
          const playlist = user.playlists.find(p => p.id === Number(playlistId));
          
          if (playlist) {
            if (!playlist.peliculas.includes(movieId)) {
              playlist.peliculas.push(movieId);
            } else {
              alert('La película ya está en la playlist.');
            }
            
            this.usuarioService.updateUsuario(user).subscribe({
              next: (updatedUser) => {
                observer.next(updatedUser);
                observer.complete();
                alert('Película agregada exitosamente a la playlist.');
              },
              error: (e: Error) => {
                console.error('Error al actualizar la playlist:', e.message);
                observer.error(e);
              }
            });
          } else {
            console.error('Playlist no encontrada.');
            observer.error(new Error('Playlist no encontrada.'));
          }
        },
        error: (e: Error) => {
          console.error('Error al obtener el usuario:', e.message);
          observer.error(e);
        }
      });
    });
  }

  deleteMovieToPlaylist(userId: string, playlistId: number, movieId: number): Observable<Usuario>{
    return new Observable<Usuario>((observer) => {
      this.usuarioService.getUsuarioById(userId).subscribe({
        next: (user) => {
          const playlist = user.playlists.find(p => p.id === playlistId);
  
          if (playlist) {
            const movieIndex = playlist.peliculas.indexOf(movieId);
            
            if (movieIndex !== -1) {
              playlist.peliculas.splice(movieIndex, 1); 
  
              this.usuarioService.updateUsuario(user).subscribe({
                next: (updatedUser) => {
                  observer.next(updatedUser);
                  observer.complete();
                  alert('Película eliminada exitosamente de la playlist.');
                },
                error: (e: Error) => {
                  console.error('Error al actualizar la playlist:', e.message);
                  observer.error(e);
                }
              });
            } else {
              console.error('Película no encontrada en la playlist.');
              observer.error(new Error('Película no encontrada en la playlist.'));
            }
          } else {
            console.error('Playlist no encontrada.');
            observer.error(new Error('Playlist no encontrada.'));
          }
        },
        error: (e: Error) => {
          console.error('Error al obtener el usuario:', e.message);
          observer.error(e);
        }
      });
    });
  }

  addMovieToMeGusta(userId: string, movieId: number): Observable<Usuario> {
  return new Observable<Usuario>((observer) => {
    // Obtener el usuario completo
    this.usuarioService.getUsuarioById(userId).subscribe({
      next: (user) => {
        // Encontrar la playlist "Me Gusta" dentro del usuario
        const playlistMeGusta = user.playlists.find(p => p.esMeGusta);

        if (playlistMeGusta && !playlistMeGusta.peliculas.includes(movieId)) {
          // Agregar la película a la playlist "Me Gusta"
          playlistMeGusta.peliculas.push(movieId);

          // Guardar la actualización en el usuario
          this.usuarioService.updateUsuario(user).subscribe({
            next: (updatedUser) => {
              observer.next(updatedUser);
              observer.complete();
              alert('Película agregada a Me Gusta.');
            },
            error: (e) => observer.error(e)
          });
        } else {
          observer.error(new Error('Película ya está en Me Gusta o playlist no encontrada.'));
        }
      },
      error: (e) => observer.error(e)
    });
  });
}

deleteMovieFromMeGusta(userId: string, movieId: number): Observable<Usuario> {
  return new Observable<Usuario>((observer) => {
    // Obtener el usuario completo
    this.usuarioService.getUsuarioById(userId).subscribe({
      next: (user) => {
        // Encontrar la playlist "Me Gusta" dentro del usuario
        const playlistMeGusta = user.playlists.find(p => p.esMeGusta);

        if (playlistMeGusta) {
          const movieIndex = playlistMeGusta.peliculas.indexOf(movieId);
          
          if (movieIndex !== -1) {
            // Eliminar la película de la playlist "Me Gusta"
            playlistMeGusta.peliculas.splice(movieIndex, 1);

            // Guardar la actualización en el usuario
            this.usuarioService.updateUsuario(user).subscribe({
              next: (updatedUser) => {
                observer.next(updatedUser);
                observer.complete();
                alert('Película eliminada de Me Gusta.');
              },
              error: (e) => observer.error(e)
            });
          } else {
            observer.error(new Error('Película no encontrada en Me Gusta.'));
          }
        } else {
          observer.error(new Error('Playlist Me Gusta no encontrada.'));
        }
      },
      error: (e) => observer.error(e)
    });
  });
}
addMovieToPeliculasVistas(userId: string, movieId: number): Observable<Usuario> {
  return new Observable<Usuario>((observer) => {
    // Obtener el usuario completo
    this.usuarioService.getUsuarioById(userId).subscribe({
      next: (user) => {
        // Encontrar la playlist "Peliculas Vistas" dentro del usuario
        const playlistPeliculasVistas = user.playlists.find(p => p.esPeliculasVistas);

        if (playlistPeliculasVistas && !playlistPeliculasVistas.peliculas.includes(movieId)) {
          // Agregar la película a la playlist "Peliculas Vistas"
          playlistPeliculasVistas.peliculas.push(movieId);

          // Guardar la actualización en el usuario
          this.usuarioService.updateUsuario(user).subscribe({
            next: (updatedUser) => {
              observer.next(updatedUser);
              observer.complete();
              alert('Película agregada a Peliculas Vistas.');
            },
            error: (e) => observer.error(e)
          });
        } else {
          observer.error(new Error('Película ya está en Peliculas Vistas o playlist no encontrada.'));
        }
      },
      error: (e) => observer.error(e)
    });
  });
}

deleteMovieFromPeliculasVistas(userId: string, movieId: number): Observable<Usuario> {
  return new Observable<Usuario>((observer) => {
    // Obtener el usuario completo
    this.usuarioService.getUsuarioById(userId).subscribe({
      next: (user) => {
        // Encontrar la playlist "Me Gusta" dentro del usuario
        const peliculasVistas = user.playlists.find(p => p.esPeliculasVistas);

        if (peliculasVistas) {
          const movieIndex = peliculasVistas.peliculas.indexOf(movieId);
          
          if (movieIndex !== -1) {
            // Eliminar la película de la playlist "Me Gusta"
            peliculasVistas.peliculas.splice(movieIndex, 1);

            // Guardar la actualización en el usuario
            this.usuarioService.updateUsuario(user).subscribe({
              next: (updatedUser) => {
                observer.next(updatedUser);
                observer.complete();
                alert('Película eliminada de Me Gusta.');
              },
              error: (e) => observer.error(e)
            });
          } else {
            observer.error(new Error('Película no encontrada en Me Gusta.'));
          }
        } else {
          observer.error(new Error('Playlist Me Gusta no encontrada.'));
        }
      },
      error: (e) => observer.error(e)
    });
  });
}


}









