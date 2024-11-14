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
  exitoMensaje: string = '';

getPlaylistPorId(userId: string | null, playlistId: number): Observable<Playlist | null> {
    return new Observable<Playlist | null>((observer) => {
      this.usuarioService.getUsuarioPorId(userId).subscribe({
        next: (user) => {
          const playlist = user.playlists.find(p => p.id === playlistId);

          if (playlist) {
            observer.next(playlist);
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

agregarPeliculaAPlaylist(userId: string, playlistId: number, movieId: number): Observable<Usuario> {
    return new Observable<Usuario>((observer) => {
      this.usuarioService.getUsuarioPorId(userId).subscribe({
        next: (user) => {
          const playlist = user.playlists.find(p => p.id === Number(playlistId));

          if (playlist) {
            if (!playlist.peliculas.includes(movieId)) {
              playlist.peliculas.push(movieId);
            } else {
            }
            this.usuarioService.actualizarUsuario(user).subscribe({
              next: (updatedUser) => {
                observer.next(updatedUser);
                observer.complete();
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

eliminarPeliculaDePlaylist(userId: string, playlistId: number, movieId: number): Observable<Usuario> {
    return new Observable<Usuario>((observer) => {
      this.usuarioService.getUsuarioPorId(userId).subscribe({
        next: (user) => {
          const playlist = user.playlists.find(p => p.id === playlistId);

          if (playlist) {
            const movieIndex = playlist.peliculas.indexOf(movieId);

            if (movieIndex !== -1) {
              playlist.peliculas.splice(movieIndex, 1);
              this.usuarioService.actualizarUsuario(user).subscribe({
                next: (updatedUser) => {
                  observer.next(updatedUser);
                  observer.complete();
                  
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

  agregarPeliculaAMeGusta(userId: string, movieId: number): Observable<Usuario> {
    return new Observable<Usuario>((observer) => {
      this.usuarioService.getUsuarioPorId(userId).subscribe({
        next: (user) => {
          const playlistMeGusta = user.playlists.find(p => p.esMeGusta);

          if (playlistMeGusta && !playlistMeGusta.peliculas.includes(movieId)) {
            playlistMeGusta.peliculas.push(movieId);
            this.usuarioService.actualizarUsuario(user).subscribe({
              next: (updatedUser) => {
                observer.next(updatedUser);
                observer.complete();
                
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

eliminarPeliculaDeMeGusta(userId: string, movieId: number): Observable<Usuario> {
    return new Observable<Usuario>((observer) => {
      this.usuarioService.getUsuarioPorId(userId).subscribe({
        next: (user) => {
          const playlistMeGusta = user.playlists.find(p => p.esMeGusta);

          if (playlistMeGusta) {
            const movieIndex = playlistMeGusta.peliculas.indexOf(movieId);

            if (movieIndex !== -1) {  
              playlistMeGusta.peliculas.splice(movieIndex, 1);
              this.usuarioService.actualizarUsuario(user).subscribe({
                next: (updatedUser) => {
                  observer.next(updatedUser);
                  observer.complete();
                  
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
agregarPeliculaAPeliculasVistas(userId: string, movieId: number): Observable<Usuario> {
    return new Observable<Usuario>((observer) => {
      this.usuarioService.getUsuarioPorId(userId).subscribe({
        next: (user) => {
          const playlistPeliculasVistas = user.playlists.find(p => p.esPeliculasVistas);

          if (playlistPeliculasVistas && !playlistPeliculasVistas.peliculas.includes(movieId)) {
            playlistPeliculasVistas.peliculas.push(movieId);
            this.usuarioService.actualizarUsuario(user).subscribe({
              next: (updatedUser) => {
                observer.next(updatedUser);
                observer.complete();
               
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

  elimiarPeliculaDePeliculasVistas(userId: string, movieId: number): Observable<Usuario> {
    return new Observable<Usuario>((observer) => {
      this.usuarioService.getUsuarioPorId(userId).subscribe({
        next: (user) => {
          const peliculasVistas = user.playlists.find(p => p.esPeliculasVistas);

          if (peliculasVistas) {
            const movieIndex = peliculasVistas.peliculas.indexOf(movieId);

            if (movieIndex !== -1) {
              peliculasVistas.peliculas.splice(movieIndex, 1);
              this.usuarioService.actualizarUsuario(user).subscribe({
                next: (updatedUser) => {
                  observer.next(updatedUser);
                  observer.complete();
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



