import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.page.html',
  styleUrls: ['./sesion.page.scss'],
})
export class SesionPage implements OnInit {

  public email:string=""
  public password:string=""
  public token:string=""
  constructor(
    public usuarioService: UsuarioService,
    private route:Router,
    ) { }

  ngOnInit() {
  }



verificar(){
  if(this.email=="" || this.password==""){
    alert("Ingresa todos los datos")
  }else{
    this.usuarioService.entrar(this.email,this.password).then(async(res)=>{
      await Preferences.set({
       key: 'token',
       value: res.data.token,
     });
     if(res.data.token){
        this.OnQuien()
     }else{
       alert("Usuario no encontrado, verifacar los campos")
     }
  })
  }

}

async OnQuien(){
  const { value } = await Preferences.get({ key: 'token' });
  if(value)
    this.usuarioService.Quien(value).then((res)=>{
     this.route.navigate(["tabs/tab3"])
    })

  }
}
