import { Component, inject, OnInit } from '@angular/core';
import { Usuario } from '../../interface/Usuario.interface';
import { UsuarioService } from '../../Service/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
  activatedRoute = inject(ActivatedRoute)

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
  alternarSeguir(): void {
    const userIdSesion = localStorage.getItem('userId');
    if (!userIdSesion || !this.usuario) return;

    const siguiendo = this.usuario.usuariosSeguidos.includes(userIdSesion);

    this.usuario.usuariosSeguidos = siguiendo
      ? this.usuario.usuariosSeguidos.filter(id => id !== userIdSesion)
      : [...this.usuario.usuariosSeguidos, userIdSesion];

    
    this.usuarioService.updateUsuario(this.usuario).subscribe({
      next: () => {
        alert(siguiendo ? 'Dejaste de seguir al usuario' : 'Ahora estás siguiendo al usuario');
      },
      error: (e: Error) => {
        console.error('Error al actualizar el seguimiento:', e.message);
      }
    });
  }
  
  //Esto lo usamos mas que nada para cambiar el texto del HTML
  esUsuarioSeguido(): boolean {
    if (typeof window === 'undefined') return false;
    const userIdSesion = localStorage.getItem('userId');
    return this.usuario?.usuariosSeguidos.includes(userIdSesion || '') || false;
  }
}

