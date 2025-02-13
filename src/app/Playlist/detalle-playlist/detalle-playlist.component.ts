import { Component, inject, OnInit } from '@angular/core';
import { Playlist } from '../interface/Playlist.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../usuario/Service/usuario.service';
import { PeliculaService } from '../../peliculas/Service/pelicula.service';
import { PlaylistService } from '../Service/playlist.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Pelicula } from '../../peliculas/interface/pelicula.interface';

@Component({
  selector: 'app-detalle-playlist',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './detalle-playlist.component.html',
  styleUrl: './detalle-playlist.component.css'
})
export class DetallePlaylistComponent implements OnInit {
  ngOnInit(): void {
    this.cargarPlaylist();
  }
  private route = inject(ActivatedRoute);
  private playlistService = inject(PlaylistService);
  private peliculaService = inject(PeliculaService);

  router = inject(Router);
  playlist: Playlist | null = null;
  peliculas: Pelicula[] = [];
  errorMessage: string | null = null;
  userId: string | null = null;
  playlistUser: Playlist | null = null;
  esActivo: boolean = false

  volverAplaylists() {
    this.router.navigate(['/playlistList']);
  }

  cargarPlaylist() {
    const routeUserId = this.route.snapshot.paramMap.get('userId');
    const localUserId = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('userId') : null;

    this.userId = routeUserId || localUserId;

    if (!this.userId) {
      this.errorMessage = 'Usuario no autenticado.';
      return;
    }

    this.esActivo = this.userId === localUserId;

    this.route.paramMap.subscribe({
      next: (param) => {
        const playlistIdStr = param.get('id');
        if (!playlistIdStr) {
          this.errorMessage = 'ID de playlist no válido.';
          return;
        }

        const playlistId = Number(playlistIdStr);
        if (isNaN(playlistId)) {
          this.errorMessage = 'ID de playlist no válido.';
          return;
        }

        this.playlistService.getPlaylistPorId(this.userId, playlistId).subscribe({
          next: (playlist) => {
            this.playlist = playlist;
            this.cargarPeliculas();
          },
          error: (error) => {
            this.errorMessage = 'Error al cargar la playlist. Por favor, inténtalo de nuevo más tarde.';
            console.error('Error al obtener la playlist:', error);
          }
        });
      },
      error: (e: Error) => {
        console.error('Error en el parámetro de ruta:', e.message);
        this.errorMessage = 'Error al leer el parámetro de la playlist.';
      }
    });
  }


  public verPlaylistOtroUsuario( playlistId: number, userId: string | undefined) {
    if (isNaN(playlistId)) {
      this.errorMessage = 'ID de playlist no válido.';
      return;
    }

    this.playlistService.getPlaylistPorId(userId!, playlistId).subscribe({
      next: (playlist) => {
        this.playlistUser = playlist;
        this.cargarPeliculas();
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar la playlist. Por favor, inténtalo de nuevo más tarde.';
        console.error('Error al obtener la playlist:', error);
      }
    });
  }

  cargarPeliculas(){
    if (this.playlist) {
      this.peliculas = [];
      this.playlist.peliculas.forEach((peliculaId) => {
        this.peliculaService.getPeliculaPorId(peliculaId).subscribe({
          next: (pelicula) => {
            this.peliculas.push(pelicula);
          },
          error: (error) => {
            console.error(`Error al obtener detalles de la película con ID ${peliculaId}:`, error);
          }
        });
      });
    }
  }

  eliminarPelicula(peliculaId: number) {
    const userId = localStorage.getItem('userId');
    if (!userId || !this.playlist) {
      this.errorMessage = 'No se puede eliminar la película. Usuario o playlist no definidos.';
      return;
    }

    this.playlistService.eliminarPeliculaDePlaylist(userId, this.playlist.id, peliculaId).subscribe({
      next: () => {
        this.peliculas = this.peliculas.filter(pelicula => pelicula.id !== peliculaId);
        alert('Película eliminada exitosamente de la playlist.');
      },
      error: (error) => {
        this.errorMessage = 'Error al eliminar la película de la playlist. Inténtalo de nuevo.';
        console.error('Error al eliminar la película:', error);
      }
    });
  }
}



