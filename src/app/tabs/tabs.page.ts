import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  public rol!:string
  constructor(
    public usuarioService: UsuarioService
    ) { }


async ngOnInit() {
  const { value } = await Preferences.get({ key: 'token' });
  if(value)
    this.usuarioService.Quien(value).then((res)=>{
      this.usuarioService.QuienId(res.data,value).then((data)=>{
          this.rol=data.data.tipo
          console.log(this.rol)
      })
    })

  }


}
