import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario/usuario';
import { UsuarioService } from '../services/usuario/usuario.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public usuario= new Usuario()
  public token:string=""
  constructor(
    private router:Router,
    public usuarioService: UsuarioService,
    ) { }

  ngOnInit() {
  }

 nuevo() {
  console.log(this.usuario)
  if(this.usuario.nombre==null || this.usuario.email==null || this.usuario.password==null || this.usuario.tipo==null){
    alert("Error en los datos verifca")
  }else{
    this.usuarioService.crearusuario(this.usuario)
    this.usuario= new Usuario
  }
}
}
