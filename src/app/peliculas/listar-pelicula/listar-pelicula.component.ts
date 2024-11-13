import { Component, ElementRef, inject, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Pelicula } from '../interface/pelicula.interface';
import { PeliculaService } from '../Service/pelicula.service';
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
  @Input() peliculas: Pelicula[] | null = null; // Recibe las películas a mostrar

  peliculasPopulares: Pelicula[] = [];
  peliculasEnCartelera: Pelicula[] = [];
  peliculasMejorCalificadas: Pelicula[] = [];
  peliculasProximas: Pelicula[] = [];

  // Selecciona todos los elementos de carrusel en el HTML
  @ViewChildren('carousel') carousels!: QueryList<ElementRef>;

  // Método para desplazar hacia la izquierda
  scrollLeft(carouselIndex: number) {
    const carousel = this.carousels.toArray()[carouselIndex].nativeElement;
    carousel.scrollBy({
      left: -carousel.offsetWidth,
      behavior: 'smooth'
    });
  }

  // Método para desplazar hacia la derecha
  scrollRight(carouselIndex: number) {
    const carousel = this.carousels.toArray()[carouselIndex].nativeElement;
    carousel.scrollBy({
      left: carousel.offsetWidth,
      behavior: 'smooth'
    });
  }

  peliculaService = inject(PeliculaService);
  router = inject(Router);

  ngOnInit(): void {
    if(!this.peliculas){
      this.cargarPeliculasPopulares();
  this.cargarPeliculasEnCartelera();
  this.cargarPeliculasMejorCalificadas();
  this.cargarPeliculasProximas();
  }}

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
