export interface PeliculaCalificada{
    peliculaId: number;
    nombrePelicula:string;
    userId: string;
    calificacion: number; // Puntuación de la película (ej: 1-5 estrellas)
    fechaDeCalificacion: Date; 
}