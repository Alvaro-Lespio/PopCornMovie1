import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../interface/Usuario.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  http = inject(HttpClient)
  baseUrl = "http://localhost:3000/usuarios"
  
  constructor() { }
   // Obtener la lista de todos los usuarios
   getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  // Obtener un usuario por ID
  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`);
  }

  // Crear un nuevo usuario
  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl, usuario)
      
  }

  // Actualizar un usuario existente
  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/${usuario.id}`, usuario)
  }

  // Eliminar un usuario por ID
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Agregar un usuario a la lista de seguidos
  followUser(currentUserId: number, followedUserId: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${currentUserId}`).pipe(
      // agregar logica 
    );

    //Agregar una playlist 

  }
}
