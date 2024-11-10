import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../usuario/servicio/usuario.service';
import { Playlist } from '../interface/Playlist.interface';

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

  generarIdNumerico(): number {
    return Math.floor(Math.random() * 1000000);
  }

  formulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]]
  });

  addPlaylist() {
    if (this.formulario.invalid) return;
    const userId = localStorage.getItem('userId')?.toString();

    const nuevaPlaylist: Playlist = {
      id: this.generarIdNumerico(),
      nombre: this.formulario.value.nombre || '',
      peliculas : []
    };
    
    if(userId === undefined) return console.log('UserId Undefined');
    console.log('El user id es: ',userId);
    this.usuarioService.addPlaylistToUser(userId, nuevaPlaylist).subscribe({
      next: () => {
        this.formulario.reset();
      },
      error: (e: Error) => {
        console.error('Error al agregar la playlist:', e.message);
        alert('Hubo un error al agregar la playlist.');
      }
    });
  }
}





