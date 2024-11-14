import { Component, inject } from '@angular/core';
import { Usuario } from '../interface/Usuario.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../Service/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-usuario',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login-usuario.component.html',
  styleUrl: './login-usuario.component.css'
})
export class LoginUsuarioComponent {
  fb = inject(FormBuilder);
  usuarioService = inject(UsuarioService);
  router = inject(Router);

  formulario = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMensaje: string | null = null;

  loginUsuario() {
    if (this.formulario.invalid) return;

    const { username, password } = this.formulario.getRawValue();

    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        const usuarioEncontrado = usuarios.find(
          usuario => usuario.username === username && usuario.password === password
        );

        if (usuarioEncontrado) {
          this.errorMensaje=null;
          if(usuarioEncontrado.id !== undefined){
            localStorage.setItem('userId',usuarioEncontrado.id.toString())
          }else{
            return console.log("login userId error")
          }

          this.router.navigateByUrl("home");
        } else {
          this.errorMensaje = 'Usuario o contraseña incorrectos';
        }
      },
      error: (e: Error) => {
        console.error('Error al intentar iniciar sesión:', e);
        this.errorMensaje = 'Hubo un error al intentar iniciar sesión.';
      }
    });
  }
}
