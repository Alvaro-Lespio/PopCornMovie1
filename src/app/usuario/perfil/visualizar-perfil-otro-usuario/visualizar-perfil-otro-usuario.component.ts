import { Component, inject, OnInit } from '@angular/core';
import { Usuario } from '../../interface/Usuario.interface';
import { UsuarioService } from '../../Service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaylistService } from '../../../Playlist/Service/playlist.service';
import { PeliculaService } from '../../../peliculas/Service/pelicula.service';
import { Pelicula } from '../../../peliculas/interface/pelicula.interface';
import { Playlist } from '../../../Playlist/interface/Playlist.interface';

@Component({
  selector: 'app-visualizar-perfil-otro-usuario',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './visualizar-perfil-otro-usuario.component.html',
  styleUrl: './visualizar-perfil-otro-usuario.component.css'
})
export class VisualizarPerfilOtroUsuarioComponent implements OnInit {
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      {
        next:(param) => {
          this.userId = param.get('id')
          if(this.userId === null) return;
          this.verPerfilUsuario(this.userId )
        },
        error:(e:Error)=>{
            console.log(e.message)
        }
      }
    )
  }
  usuarioService = inject(UsuarioService);
  usuario: Usuario | null = null;
  userId: string | null = null;
  peliculas: Pelicula[] = [];
  errorMessage: string | null = null;
  playlistUser: Playlist | null = null;

  activatedRoute = inject(ActivatedRoute)
  routes = inject(Router)
  playlistService = inject(PlaylistService)
  peliculaService = inject(PeliculaService)

  verPerfilUsuario(userId: string): void {
    this.usuarioService.getUsuarioPorId(userId).subscribe({
      next: (usuario: Usuario) => {
        this.usuario = usuario;
      },
      error: (e: Error) => {
        console.error('Error al cargar el perfil del usuario:', e.message);
        alert('Hubo un error al cargar el perfil del usuario.');
      }
    });
  }
  alternarSeguir(): void {
    const userIdSesion = localStorage.getItem('userId');
    if (!userIdSesion || !this.usuario) return;

    const siguiendo = this.usuario.usuariosSeguidos.includes(userIdSesion);

    this.usuario.usuariosSeguidos = siguiendo
      ? this.usuario.usuariosSeguidos.filter(id => id !== userIdSesion)
      : [...this.usuario.usuariosSeguidos, userIdSesion];

    
    this.usuarioService.actualizarUsuario(this.usuario).subscribe({
      next: () => {
        alert(siguiendo ? 'Dejaste de seguir al usuario' : 'Ahora estás siguiendo al usuario');
      },
      error: (e: Error) => {
        console.error('Error al actualizar el seguimiento:', e.message);
      }
    });
  }
  
  
  esUsuarioSeguido(): boolean {
    if (typeof window === 'undefined') return false;
    const userIdSesion = localStorage.getItem('userId');
    return this.usuario?.usuariosSeguidos.includes(userIdSesion || '') || false;
  }
  
  verPlaylist(playlistId:number,usuarioId:string |undefined){
      this.routes.navigateByUrl(`playlist/${usuarioId}/${playlistId}`);
  }

}

