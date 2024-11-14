import { Comentario } from "../../Comentario/interface/Comentario.interface";
import { PeliculaCalificada } from "../../PeliculaCalificada/interface/interface/PeliculaCalificada.interface";
import { Playlist } from "../../Playlist/interface/Playlist.interface";

export interface Usuario{
    id?: string;
    username: string;
    password: string;
    nombreCompleto: string;
    email: string;
    playlists: Playlist[]; 
    peliculasCalificadas: PeliculaCalificada[]; 
    comentarios: Comentario[]; 
    usuariosSeguidos: string[]; 
    peliculasVistas: number[]; 
    peliculasMeGusta: number[]; 
}