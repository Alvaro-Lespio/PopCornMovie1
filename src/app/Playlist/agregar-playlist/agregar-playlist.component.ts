import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../usuario/Service/usuario.service';
import { Playlist } from '../interface/Playlist.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-playlist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-playlist.component.html',
  styleUrl: './agregar-playlist.component.css'
})
export class AgregarPlaylistComponent {

  fb = inject(FormBuilder);
  usuarioService = inject(UsuarioService);
  router = inject(Router)
  generarIdNumerico(): number {
    return Math.floor(Math.random() * 1000000);
  }

  formulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]]
  });

  volverAplaylists() {
    this.router.navigate(['/playlistList']);
  }

  agregarPlaylist() {
    if (this.formulario.invalid) return;
    const userId = localStorage.getItem('userId')?.toString();

    const nuevaPlaylist: Playlist = {
      id: this.generarIdNumerico(),
      nombre: this.formulario.value.nombre || '',
      peliculas : []
    };

    if(userId === undefined) return console.log('UserId Undefined');
    console.log('El user id es: ',userId);
    this.usuarioService.agregarPlaylistAUsuario(userId, nuevaPlaylist).subscribe({
      next: () => {
        this.formulario.reset();
        this.listarPlaylist();
      },
      error: (e: Error) => {
        console.error('Error al agregar la playlist:', e.message);
        alert('Hubo un error al agregar la playlist.');
      }
    });
  }

  listarPlaylist(){
    this.router.navigateByUrl('playlistList');
  }
}






