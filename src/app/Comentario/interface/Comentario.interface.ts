export interface Comentario {
    id: number;
    peliculaId: number;
    userId: string; 
    fecha: Date;
    texto: string;
}