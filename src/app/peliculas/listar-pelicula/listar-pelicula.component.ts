import { Component, inject, Input, OnInit } from '@angular/core';
import { Pelicula } from '../interface/pelicula.interface';
import { PeliculaService } from '../servicio/pelicula.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pelicula',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-pelicula.component.html',
  styleUrl: './listar-pelicula.component.css'
})
export class ListarPeliculaComponent implements OnInit{
  @Input() peliculas: Pelicula[] = []; // Recibe las películas a mostrar

  peliculasPopulares: Pelicula[] = [];
  peliculasEnCartelera: Pelicula[] = [];
  peliculasMejorCalificadas: Pelicula[] = [];
  peliculasProximas: Pelicula[] = [];

  peliculaService = inject(PeliculaService);
  router = inject(Router);

  ngOnInit(): void {
    this.cargarPeliculasPopulares();
  this.cargarPeliculasEnCartelera();
  this.cargarPeliculasMejorCalificadas();
  this.cargarPeliculasProximas();
  }

  verDetalle(id: number){
    this.router.navigate(['detalle', id]);
  }

  cargarPeliculasPopulares(){
    this.peliculaService.getPeliculasPopulares().subscribe((peliculas)=>{
      this.peliculasPopulares = peliculas;
    })
  }

  cargarPeliculasEnCartelera() {
    this.peliculaService.getPeliculasEnCartelera().subscribe((peliculas) => {
      this.peliculasEnCartelera = peliculas;
    });
  }

  cargarPeliculasMejorCalificadas() {
    this.peliculaService.getPeliculasMejorCalificadas().subscribe((peliculas) => {
      this.peliculasMejorCalificadas = peliculas;
    });
  }

  cargarPeliculasProximas() {
    this.peliculaService.getPeliculasProximas().subscribe((peliculas) => {
      this.peliculasProximas = peliculas;
    });
  }

}
