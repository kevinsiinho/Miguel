import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../modelos/usuario/usuario';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  implements OnInit{

  public usuario= new Usuario
  constructor(private route:Router, public usuarioService: UsuarioService) {}

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'token' });
    if(value)
      this.usuarioService.Quien(value).then((res)=>{
        this.usuarioService.QuienId(res.data,value).then((data)=>{
          this.usuario=data.data
        })
      })
    }
 async salir(){
    await Preferences.remove({ key: 'token' });
    alert("Vuelve pronto")
    this.route.navigate(['/sesion'])
  }

}
