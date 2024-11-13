import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../Service/usuario.service';
import { Usuario } from '../../interface/Usuario.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-visualizar-perfil',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './visualizar-perfil.component.html',
  styleUrl: './visualizar-perfil.component.css'
})
export class VisualizarPerfilComponent implements OnInit {
  ngOnInit(): void {
      if (typeof window !== 'undefined') {
        this.userId = localStorage.getItem('userId');
      }
      if(this.userId === null) return;
      this.verPerfilUsuario(this.userId)

  }
  usuarioService = inject(UsuarioService);
  usuario: Usuario | null = null;
  userId: string | null = null;
  routes = inject(Router)
  verPerfilUsuario(userId: string): void {
    this.usuarioService.getUsuarioById(userId).subscribe({
      next: (usuario: Usuario) => {
        this.usuario = usuario;
        
      },
      error: (e: Error) => {
        console.error('Error al cargar el perfil del usuario:', e.message);
        alert('Hubo un error al cargar el perfil del usuario.');
      }
    });
  }

  editarPerfil(){
    this.routes.navigateByUrl('actualizarPerfil');
  }

  verPlaylist(playlistId:number){
    this.routes.navigateByUrl(`playlist/${playlistId}`);
  }

}
