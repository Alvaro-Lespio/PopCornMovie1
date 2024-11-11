import { Component, inject } from '@angular/core';
import { PeliculaService } from '../servicio/pelicula.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-pelicula',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.css'
})
export class DetallePeliculaComponent {
  pelicula: any;
  genresFormatted = '';
  
  route = inject(ActivatedRoute);
  router = inject(Router);
  peliculaService = inject(PeliculaService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.peliculaService.getPeliculaById(+id).subscribe((pelicula) => {
        this.pelicula = pelicula;
        this.genresFormatted = pelicula.genres.map((g: any) => g.name).join(', ');
      });
    }
  }

  volverALista() {
    this.router.navigate(['/listar-pelicula']);
  }
}
