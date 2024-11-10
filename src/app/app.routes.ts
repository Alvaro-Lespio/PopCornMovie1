import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginUsuarioComponent } from './usuario/login-usuario/login-usuario.component';
import { RegistrarUsuarioComponent } from './usuario/registrar-usuario/registrar-usuario.component';
import { AgregarPlaylistComponent } from './Playlist/agregar-playlist/agregar-playlist.component';
import { ListarPlaylistComponent } from './Playlist/listar-playlist/listar-playlist.component';

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
        path:"playlistList",
        component:ListarPlaylistComponent
    },
    {
        path:"**",
        redirectTo:'home'
    }
];
