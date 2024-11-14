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

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      if (typeof window !== 'undefined') {
        this.userId = localStorage.getItem('userId') || '';
      }

      this.peliculaService.getPeliculaPorId(+id).subscribe((pelicula) => {
        this.pelicula = pelicula;
        this.genresFormatted = pelicula.genres.map((g: any) => g.name).join(', ');
        this.verificarSiPeliculaVista(+id);
      });

      if (this.userId) {
        this.usuarioService.getPlaylistsDeUsuario(this.userId).subscribe((playlists) => {
          this.playlists = playlists;
        });
      }
    }
  }

  route = inject(ActivatedRoute);
  router = inject(Router);
  playlistService = inject(PlaylistService)
  peliculaService = inject(PeliculaService);
  usuarioService = inject(UsuarioService);

  exitoMensaje: string = '';
  pelicula: any;
  genresFormatted = '';
  playlists: Playlist[] = [];
  calificacion: number = 0;
  hoverCalificacion: number = 0;
  playlistId: number | null = null;
  esVista: boolean = false;
  userId : string = '';
  texto:string = '';

  volverALista() {
    this.router.navigate(['/listar-pelicula']);
  }

  mostrarMensaje(mensaje: string) {
    this.exitoMensaje = mensaje;
    setTimeout(() => {
      this.exitoMensaje = '';
    }, 4000);
  }

  agregarAPlaylist(movieId: number) {
    if (this.playlistId !== null) {
      this.playlistService.agregarPeliculaAPlaylist(this.userId, this.playlistId, movieId).subscribe({
        next: () => {
          this.mostrarMensaje('Película añadida a la playlist exitosamente.');
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
  calificarTexto(textoInput:string){
    //Funcion aca
  }
  calificarPelicula() {
      const nuevaCalificacion: PeliculaCalificada = {
      peliculaId: this.pelicula.id,
      nombrePelicula: this.pelicula.title,
      userId: this.userId,
      calificacion: this.calificacion,
      texto:this.texto,
      fechaDeCalificacion: new Date(),
    };

    this.usuarioService.calificarPeliculaEnUsuario(this.userId, nuevaCalificacion).subscribe({
      next: () => {
        this.mostrarMensaje('Película calificada.');
      },
      error: (error) => {
        console.error('Error al guardar la calificación en el usuario:', error);
      }
    });
  }

  agregarAMeGusta(movieId: number) {
    const userId = localStorage.getItem('userId')?.toString();

    if (userId) {
      this.playlistService.agregarPeliculaAMeGusta(userId, movieId).subscribe({
        next: () => {
          this.mostrarMensaje('Película añadida a "Me Gusta" exitosamente.');
        },
        error: (e: Error) => {
          console.error('Error al añadir la película:', e.message);
        }
      });
    } else {
      console.error('No se encontró el ID de usuario en localStorage.');
    }
  }
  verificarSiPeliculaVista(movieId: number) {
    this.usuarioService.getPlaylistsDeUsuario(this.userId).subscribe((playlists) => {
      const peliculasVistasPlaylist = playlists.find(p => p.esPeliculasVistas);
      if (peliculasVistasPlaylist) {
        this.esVista = peliculasVistasPlaylist.peliculas.includes(movieId);
      }
    });
  }

  agregarAPeliculaVista(movieId: number) {
    if (this.esVista) {
      this.playlistService.agregarPeliculaAPeliculasVistas(this.userId, movieId).subscribe({
        next: () => {
          this.mostrarMensaje('Película marcada como vista.');
        },
        error: (e: Error) => {
          console.error('Error al marcar la película como vista:', e.message);
        }
      });
    } else {
      this.playlistService.elimiarPeliculaDePeliculasVistas(this.userId, movieId).subscribe({
        next: () => {
          alert('Película desmarcada como vista.');
        },
        error: (e: Error) => {
          console.error('Error al desmarcar la película como vista:', e.message);
        }
      });
    }
  }
  }



