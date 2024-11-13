import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../Service/usuario.service';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../interface/Usuario.interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-perfiles',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './listar-perfiles.component.html',
  styleUrl: './listar-perfiles.component.css'
})
export class ListarPerfilesComponent implements OnInit {
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.userIdSesion = localStorage.getItem('userId');
    }
    this.cargarUsuarios();
  }
  usuarioService = inject(UsuarioService);
  router = inject(Router);
  usuarios: Usuario[] = [];
  userIdSesion: string | null = null;
  

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      error: (e: Error) => {
        console.error('Error al cargar los usuarios:', e.message);
        alert('Hubo un error al cargar los usuarios.');
      }
    });
  }
  
  
    
   
}
