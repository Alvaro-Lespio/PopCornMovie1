import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../../usuario/interface/Usuario.interface';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../usuario/servicio/usuario.service';
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

}









