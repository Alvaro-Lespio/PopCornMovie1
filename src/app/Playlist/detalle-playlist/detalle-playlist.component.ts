import { Component, inject, OnInit } from '@angular/core';
import { Playlist } from '../interface/Playlist.interface';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../usuario/servicio/usuario.service';
import { PeliculaService } from '../../peliculas/servicio/pelicula.service';
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
  private route = inject(ActivatedRoute);
  private playlistService = inject(PlaylistService);
  private peliculaService = inject(PeliculaService);

  playlist: Playlist | null = null;
  peliculas: Pelicula[] = [];
  errorMessage: string | null = null;
  userId: string | null = null;

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.userId = localStorage.getItem('userId');

    if (!this.userId) {
      this.errorMessage = 'Usuario no autenticado.';
      return;
    }

    this.route.paramMap.subscribe({
      next: (param) => {
        const playlistIdStr = param.get('id');
        console.log(playlistIdStr);
        if (!playlistIdStr) {
          this.errorMessage = 'ID de playlist no válido.';
          return;
        }

        const playlistId = Number(playlistIdStr);
        if (isNaN(playlistId)) {
          this.errorMessage = 'ID de playlist no válido.';
          return;
        }
       
        this.playlistService.getPlaylistById(this.userId!, playlistId).subscribe({
          next: (playlist) => {
            this.playlist = playlist;
            this.loadPeliculas();
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

  private loadPeliculas(): void {
    if (this.playlist) {
      this.peliculas = [];
      this.playlist.peliculas.forEach((peliculaId) => {
        this.peliculaService.getPeliculaById(peliculaId).subscribe({
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

  eliminarPelicula(peliculaId:number){
    if (!this.userId || !this.playlist) {
      this.errorMessage = 'No se puede eliminar la película. Usuario o playlist no definidos.';
      return;
    }
  
    this.playlistService.deleteMovieToPlaylist(this.userId, this.playlist.id, peliculaId).subscribe({
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



