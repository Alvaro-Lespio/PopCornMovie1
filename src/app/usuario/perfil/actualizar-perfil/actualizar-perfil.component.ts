import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../Service/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interface/Usuario.interface';


@Component({
  selector: 'app-actualizar-perfil',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './actualizar-perfil.component.html',
  styleUrl: './actualizar-perfil.component.css'
})
export class ActualizarPerfilComponent implements OnInit {
 
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    if (this.userId) {
      this.usuarioService.getUsuarioPorId(this.userId).subscribe({
        next: (usuario: Usuario) => {
          this.usuario = usuario;
          this.formulario.patchValue({
            username: usuario.username,
            password: usuario.password,
            nombreCompleto: usuario.nombreCompleto,
            email: usuario.email
          });
        },
        error: (error) => {
          console.error('Error al cargar los datos del usuario:', error);
          
        }
      });
    }
  }
  fb = inject(FormBuilder);
  usuarioService = inject(UsuarioService);
  router = inject(Router);

  userId: string = '';
  usuario!: Usuario;

  formulario = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    nombreCompleto: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  

  actualizarPerfil() {
    if (this.formulario.invalid) return;

    const usuarioActualizado: Usuario = {
      ...this.usuario,
      username: this.formulario.value.username || this.usuario.username,
      password: this.formulario.value.password || this.usuario.password,
      nombreCompleto: this.formulario.value.nombreCompleto || this.usuario.nombreCompleto,
      email: this.formulario.value.email || this.usuario.email
    };

    this.usuarioService.actualizarUsuario(usuarioActualizado).subscribe({
      next: () => {
       
        this.router.navigateByUrl('/perfil');
      },
      error: (error) => {
        console.error('Error al actualizar el perfil:', error);
        alert('Hubo un error al actualizar el perfil.');
      }
    });
  }
}



