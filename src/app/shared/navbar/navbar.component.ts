import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  router = inject(Router)

  //se fija si hay un usuario o no
  usuarioLogueado() {
    if (typeof window !== 'undefined' && localStorage) {
        return localStorage.getItem('userId');
    }
    return null;
}

  //cerrar sesion
  cerrarSesion(){
    localStorage.clear();
    this.router.navigateByUrl('home');
  }
}
