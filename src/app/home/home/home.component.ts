import { Component } from '@angular/core';
import { LoginUsuarioComponent } from "../../usuario/login-usuario/login-usuario.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginUsuarioComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
