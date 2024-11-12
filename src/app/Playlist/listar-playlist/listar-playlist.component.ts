import { Component, inject, OnInit } from '@angular/core';
import { Playlist } from '../interface/Playlist.interface';
import { UsuarioService } from '../../usuario/servicio/usuario.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-playlist',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './listar-playlist.component.html',
  styleUrl: './listar-playlist.component.css'
})
export class ListarPlaylistComponent implements OnInit{
  
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.listarPlaylist();
    }
  }
  
  usuarioService = inject(UsuarioService);
  playlists: Playlist[] = [];
  router = inject(Router)
  listarPlaylist(){
      const userId = localStorage.getItem('userId')?.toString();
      if(userId !== undefined){
        console.log("El user id es: ", userId);
        this.usuarioService.getPlaylistsOfUser(userId).subscribe({
          next: (playlists: Playlist[]) => {
            this.playlists = playlists;
          },
          error: (e: Error) => {
            console.error('Error al obtener las playlists:', e.message);
            alert('Hubo un error al cargar las playlists.');
          }
        });
      }else{
        console.log("se encontro un error ");        
      }
  }
  eliminarPlaylist(playlistId:number){
    const userId = localStorage.getItem('userId')?.toString();
    if(userId !== undefined){
      this.usuarioService.removePlaylistFromUser(userId,playlistId).subscribe({
        next :()=>{
          this.playlists = this.playlists.filter(playlist => playlist.id !== playlistId);
          alert('Eliminado')
        },
        error:(e:Error)=>{
          console.log(e.message)
        }
      })
    }
  }

  verPlaylist(playlistId: number){
    this.router.navigateByUrl(`/playlist/${playlistId}`);
  }
 
  }

