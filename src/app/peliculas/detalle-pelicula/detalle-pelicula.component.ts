import { Component, inject, OnInit } from '@angular/core';
import { PeliculaService } from '../servicio/pelicula.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../Playlist/Service/playlist.service';
import { UsuarioService } from '../../usuario/servicio/usuario.service';
import { Playlist } from '../../Playlist/interface/Playlist.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-pelicula',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.css'
})
export class DetallePeliculaComponent implements OnInit{

  pelicula: any;
  genresFormatted = '';
  playlists: Playlist[] = []; 


  route = inject(ActivatedRoute);
  router = inject(Router);
  playlistService = inject(PlaylistService)  
  peliculaService = inject(PeliculaService);
  usuarioService = inject(UsuarioService);
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
}
