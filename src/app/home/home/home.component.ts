import { Component, inject, OnInit } from '@angular/core';
import { LoginUsuarioComponent } from "../../usuario/login-usuario/login-usuario.component";
import { Pelicula } from '../../peliculas/interface/pelicula.interface';
import { BusquedaPeliculaComponent } from "../../peliculas/busqueda-pelicula/busqueda-pelicula.component";
import { ListarPeliculaComponent } from "../../peliculas/listar-pelicula/listar-pelicula.component";
import { PeliculaService } from '../../peliculas/Service/pelicula.service';

import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BusquedaPeliculaComponent, ListarPeliculaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  resultadosBusqueda: Pelicula[] | null = null;
  private router = inject(Router);
  constructor(private peliculaService: PeliculaService) {}

  
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd && event.urlAfterRedirects === 'home')
    ).subscribe(() => {
      this.resultadosBusqueda = null;
    });
  }
  
  // Método que se ejecuta cuando se realiza una búsqueda o se aplican filtros
  actualizarResultadosBusqueda(peliculas: Pelicula[]) {
    this.resultadosBusqueda = peliculas.length > 0 ? peliculas : null;
  }
}
