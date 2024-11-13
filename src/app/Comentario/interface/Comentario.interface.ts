export interface Comentario {
    id: number;
    peliculaId: number;
    userId: string; 
    fecha: Date;
    texto: string;
    estrellas: number; // Calificación en estrellas (0-5), opcional si el usuario solo quiere comentar
  }