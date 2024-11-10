import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../servicio/usuario.service';
import { Usuario } from '../interface/Usuario.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent{

  fb = inject(FormBuilder);
  usuarioService = inject(UsuarioService);
  router = inject(Router);

  formulario = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    nombreCompleto: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  registerUsuario() {
    if (this.formulario.invalid) return;
    const usuario: Usuario = { 
      username: this.formulario.value.username || '',
      password: this.formulario.value.password || '',
      nombreCompleto: this.formulario.value.nombreCompleto || '',
      email: this.formulario.value.email || '',
      playlists: [], 
      peliculasCalificadas: [],
      comentarios: [],
      usuariosSeguidos: [],
      peliculasVistas: [],
      peliculasMeGusta: []
    };

    this.usuarioService.createUsuario(usuario).subscribe({
      next: (nuevoUsuario: Usuario) => {
        if(nuevoUsuario.id !== undefined){
          localStorage.setItem('userId', nuevoUsuario.id.toString());
        }else{
          console.log("id undefineed")
        }
        
        this.router.navigateByUrl('login');
      },
      error: (e:Error) => {
        console.error('Error al registrarse:', e);
        alert('Hubo un error al registrarse.');
      }
    });
  }
}
