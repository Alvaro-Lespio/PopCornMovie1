import { Comentario } from "../../Comentario/interface/Comentario.interface";
import { PeliculaCalificada } from "../../PeliculaCalificada/interface/interface/PeliculaCalificada.interface";
import { Playlist } from "../../Playlist/interface/Playlist.interface";

export interface Usuario{
    id: number;
    username: string;
    password: string;
    nombreCompleto: string;
    email: string;
    playlists: Playlist[]; // Relación con las playlists del usuario por id
    peliculasCalificadas: PeliculaCalificada[]; // Relación con las películas calificadas por el usuario
    comentarios: Comentario[]; // Relación con los comentarios realizados por el usuario
    usuariosSeguidos: Usuario[]; // Lista de usuarios que sigue por id
    peliculasVistas: number[]; // IDs de las películas marcadas como vistas
    peliculasMeGusta: number[]; // IDs de las películas marcadas con "me gusta"
}