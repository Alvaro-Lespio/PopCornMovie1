import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginUsuarioComponent } from './usuario/login-usuario/login-usuario.component';
import { RegistrarUsuarioComponent } from './usuario/registrar-usuario/registrar-usuario.component';
import { AgregarPlaylistComponent } from './Playlist/agregar-playlist/agregar-playlist.component';
import { ListarPlaylistComponent } from './Playlist/listar-playlist/listar-playlist.component';

import { ListarPeliculaComponent } from './peliculas/listar-pelicula/listar-pelicula.component';
import { BusquedaPeliculaComponent } from './peliculas/busqueda-pelicula/busqueda-pelicula.component';

import { ListarPerfilesComponent } from './usuario/perfil/listar-perfiles/listar-perfiles.component';
import { VisualizarPerfilOtroUsuarioComponent } from './usuario/perfil/visualizar-perfil-otro-usuario/visualizar-perfil-otro-usuario.component';
import { VisualizarPerfilComponent } from './usuario/perfil/visualizar-perfil/visualizar-perfil.component';
import { DetallePeliculaComponent } from './peliculas/detalle-pelicula/detalle-pelicula.component';
import { DetallePlaylistComponent } from './Playlist/detalle-playlist/detalle-playlist.component';
import { ActualizarPlaylistComponent } from './Playlist/actualizar-playlist/actualizar-playlist.component';
import { ActualizarPerfilComponent } from './usuario/perfil/actualizar-perfil/actualizar-perfil.component';


export const routes: Routes = [

    {
        path:"home",
        component:HomeComponent
    },
    {
        path:"login",
        component:LoginUsuarioComponent
    },
    {
        path:"registrarse",
        component:RegistrarUsuarioComponent
    },
    {
        path:"playlist",
        component:AgregarPlaylistComponent
    },
    {
        path:"playlist/:id",
        component:DetallePlaylistComponent
    },
    {
        path:"playlistList",
        component:ListarPlaylistComponent
    },
    {
        path: 'actualizarPlaylist/:id',
        component: ActualizarPlaylistComponent
    },
    {

        path:"peliculas",
        component:ListarPeliculaComponent
    },
    {
        path:"buscar",
        component:BusquedaPeliculaComponent
    },
    {
        path:"detalle/:id",
        component:DetallePeliculaComponent
    },
    {
        path:"listarPerfiles",
        component:ListarPerfilesComponent

    },
    {
        path: "perfil/:id",
        component: VisualizarPerfilOtroUsuarioComponent
    },
    {
        path: "actualizarPerfil",
        component: ActualizarPerfilComponent
    },
    {
        path: "perfil",
        component: VisualizarPerfilComponent

    },
    {
        path:"**",
        redirectTo:'home'
    }
];
