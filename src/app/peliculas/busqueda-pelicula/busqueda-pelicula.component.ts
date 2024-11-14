import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Pelicula } from '../interface/pelicula.interface';
import { PeliculaService } from '../Service/pelicula.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-busqueda-pelicula',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './busqueda-pelicula.component.html',
  styleUrl: './busqueda-pelicula.component.css'
})
export class BusquedaPeliculaComponent {
  @Output() onBuscar = new EventEmitter<Pelicula[]>();

  peliculaService = inject(PeliculaService);
  fb = inject(FormBuilder);

  formulario = this.fb.nonNullable.group(
    {
      query: [''],
      genero: [''],
      año: [''],
      popularidad: ['']
    }
  )

  // Lista de géneros disponibles
  generos = Object.keys(this.peliculaService.generos); 

  buscarPeliculas() {
    const query = this.formulario.get('query')?.value;
    if (query) {
      this.peliculaService.buscarPelicula(query).subscribe((resultados) => {
        this.onBuscar.emit(resultados);
      });
    } else {
      this.aplicarFiltro();
    }
  }

  aplicarFiltro() {
    const { genero, año, popularidad } = this.formulario.getRawValue();
  
    const filtros = {
      genero: genero || undefined,
      año: año || undefined,
      popularidad: popularidad || undefined
    };
    this.peliculaService.filtrarPeliculas(filtros).subscribe((peliculas) => {
      this.onBuscar.emit(peliculas);
    });
  }
}