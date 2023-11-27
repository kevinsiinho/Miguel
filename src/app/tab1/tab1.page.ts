import { Component } from '@angular/core';
import { Anteproyectos } from '../modelos/anteproyectos/anteproyectos';
import { AnteproyectosService } from '../services/anteproyectos/anteproyectos.service';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  public anteproyecto= new Anteproyectos
  public anteproyectos:Anteproyectos[]=[]
  public comentario:string=""
  public op:string=""
  constructor(
    public anteproyectoservice:AnteproyectosService,
    public usuarioService:UsuarioService,
    public route:Router,
    )
   { }

ngOnInit(){
    this.anteproyectoservice.allanteproyectos().then(async (res:Anteproyectos[])=>{
      this.anteproyectos=res
       this.Quien().then((iduser)=>{
            this.anteproyectos.forEach(element => {
              if(element.idusuario===iduser){
                  this.anteproyecto=element
                  console.log(element.correciones)
              }
            })
          })
        })
}

nuevo(){
    this.Quien().then((iduser)=>{
      if(iduser!=""){
      this.anteproyecto.idusuario=iduser
      this.anteproyecto.estado="Creado";
      this.anteproyectoservice.Nuevoanteproyecto(this.anteproyecto)
      }
    })
}

actualizar(){
  console.log(this.anteproyecto)
  let id=String(this.anteproyecto.id)
  this.anteproyecto.estado="Enviado";
  this.anteproyectoservice.ActualizarAnteproyecto(id,this.anteproyecto)
}

async Quien(){
    const { value } = await Preferences.get({ key: 'token' });
    if(value){
      const res= await this.usuarioService.Quien(value);
      this.usuarioService.QuienId(res.data,value).then((data)=>{
        if(data.data.tipo=="estudiante"){
          this.route.navigate(["tabs/tab1/estudiante"])
        }else if(data.data.tipo=="admin"){
          this.route.navigate(["tabs/tab2/admin"])
        }
      })
      return String(res.data)
    }else{
      return ""
    }
  }
}
