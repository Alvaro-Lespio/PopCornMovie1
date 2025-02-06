import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../usuario/Service/usuario.service';
import { Playlist } from '../interface/Playlist.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-playlist',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './actualizar-playlist.component.html',
  styleUrl: './actualizar-playlist.component.css'
})
export class ActualizarPlaylistComponent implements OnInit{

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      {
        next:(param) => {
          this.playlistId = Number(param.get('id'))

        },
        error:(e:Error)=>{
            console.log(e.message)
        }
      }
    )
  }


  fb = inject(FormBuilder);
  usuarioService = inject(UsuarioService);
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)


  playlistId : number | null = null;
  userId : string | undefined = undefined;


  volverAplaylists() {
    this.router.navigate(['/playlistList']);
  }

  formulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]]
  });

  actualizarPlaylist() {
    if (this.formulario.invalid) return;

     this.userId = localStorage.getItem('userId')?.toString();

    if (this.formulario.invalid || !this.userId) return;

    const nuevoNombre = this.formulario.value.nombre || '';

    this.usuarioService.actualizarPlaylistDeUsuario(this.userId, Number(this.playlistId), nuevoNombre).subscribe({
      next: () => {
        this.formulario.reset();
        console.log('Playlist actualizada exitosamente.');
        this.listarPlaylist();
      },
      error: (e: Error) => {
        console.error('Error al actualizar la playlist:', e.message);
        alert('Hubo un error al actualizar la playlist.');
      }
    });
  }

  listarPlaylist(){
    this.router.navigateByUrl('playlistList');
  }
}
