export interface PeliculaCalificada{
    peliculaId: number;
    nombrePelicula:string;
    userId: string;
    calificacion: number; // (1-5 estrellas)
    texto:string;
    fechaDeCalificacion: Date; 
}