import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AnteproyectosService } from '../services/anteproyectos/anteproyectos.service';
import { Anteproyectos } from '../modelos/anteproyectos/anteproyectos';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  isModalOpen= false;

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
    this.OnQuien();

    this.anteproyectoservice.allanteproyectos().then((res:Anteproyectos[])=>{
      this.anteproyectos=res
    })
  }

  @ViewChild(IonModal) modal!: IonModal;

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.isModalOpen = false;
  }

  confirm() {
    if(this.comentario!=""){
    this.modal.dismiss('confirm');
    this.isModalOpen = false;
    const temporal={"nombre":this.op,"comentario":this.comentario }
    this.anteproyecto.correciones.push(temporal)
    this.anteproyecto.estado="Corregido"
    let id=String(this.anteproyecto.id)
    this.anteproyectoservice.ActualizarAnteproyecto(id,this.anteproyecto).then((datos)=>{
      if(datos.status==204){
         alert("Actualización exitosa!!!")
       }
     })
    }else{
      alert("Escoge una opcion")
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  verproyecto(p:number){
    this.anteproyecto=this.anteproyectos[p]
  }

  async OnQuien(){
    const { value } = await Preferences.get({ key: 'token' });
    if(value)
      this.usuarioService.Quien(value).then((res)=>{
        this.usuarioService.QuienId(res.data,value).then((data)=>{
          if(data.data.tipo=="estudiante"){
            this.route.navigate(["tabs/tab1/estudiante"])
          }else if(data.data.tipo=="admin"){
            this.route.navigate(["tabs/tab2/admin"])
          }
        })
      })

    }

}
