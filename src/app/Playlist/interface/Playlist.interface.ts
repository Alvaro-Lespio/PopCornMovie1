export interface Playlist{
    id: number;
    nombre: string;  
    peliculas: number[]; 
    esMeGusta?:boolean;
    esPeliculasVistas?: boolean;
}