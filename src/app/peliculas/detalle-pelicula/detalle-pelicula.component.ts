import { Component, inject, OnInit } from '@angular/core';
import { PeliculaService } from '../Service/pelicula.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../Playlist/Service/playlist.service';
import { UsuarioService } from '../../usuario/Service/usuario.service';
import { Playlist } from '../../Playlist/interface/Playlist.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeliculaCalificada } from '../../PeliculaCalificada/interface/interface/PeliculaCalificada.interface';

@Component({
  selector: 'app-detalle-pelicula',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.css'
})
export class DetallePeliculaComponent implements OnInit{

  route = inject(ActivatedRoute);
  router = inject(Router);
  playlistService = inject(PlaylistService)  
  peliculaService = inject(PeliculaService);
  usuarioService = inject(UsuarioService);


  pelicula: any;
  genresFormatted = '';
  playlists: Playlist[] = []; 
  calificacion: number = 0; 
  hoverCalificacion: number = 0; 
  playlistId: number | null = null;
  userId : string = '';
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      
      if (typeof window !== 'undefined') {
        this.userId = localStorage.getItem('userId') || '';
      }
      
      this.peliculaService.getPeliculaById(+id).subscribe((pelicula) => {
        this.pelicula = pelicula;
        this.genresFormatted = pelicula.genres.map((g: any) => g.name).join(', ');
      });

      if (this.userId) {
        this.usuarioService.getPlaylistsOfUser(this.userId).subscribe((playlists) => {
          this.playlists = playlists;
        });
      }
    }
  }

  volverALista() {
    this.router.navigate(['/listar-pelicula']);
  }
  
  addToPlaylist(movieId: number) {
    if (this.playlistId !== null) {
      this.playlistService.addMovieToPlaylist(this.userId, this.playlistId, movieId).subscribe({
        next: () => {
         alert('Película añadida a la playlist exitosamente.');
        },
        error: (e: Error) => {
          console.error('Error al añadir la película:', e.message);
        }
      });
    } else {
      console.error('No se ha seleccionado ninguna playlist.');
    }
  }

  
  calificar(estrella: number) {
    this.calificacion = estrella;
  }

  calificarPelicula() {
      const nuevaCalificacion: PeliculaCalificada = {
      peliculaId: this.pelicula.id,
      nombrePelicula: this.pelicula.title,
      userId: this.userId,
      calificacion: this.calificacion,
      fechaDeCalificacion: new Date(),
    };
  
    this.usuarioService.calificarPeliculaEnUsuario(this.userId, nuevaCalificacion).subscribe({
      next: () => {
        alert('Calificación guardada exitosamente en el usuario.');
      },
      error: (error) => {
        console.error('Error al guardar la calificación en el usuario:', error);
      }
    });
  }
  addToMeGusta(movieId: number) {
    const userId = localStorage.getItem('userId')?.toString();
  
    if (userId) {
      this.playlistService.addMovieToMeGusta(userId, movieId).subscribe({
        next: () => {
          alert('Película añadida a "Me Gusta" exitosamente.');
        },
        error: (e: Error) => {
          console.error('Error al añadir la película:', e.message);
        }
      });
    } else {
      console.error('No se encontró el ID de usuario en localStorage.');
    }
  }

}
