import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AnteproyectosService } from '../services/anteproyectos/anteproyectos.service';
import { Anteproyectos } from '../modelos/anteproyectos/anteproyectos';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
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
    public usuarioService:UsuarioService
    )
   { }

  ngOnInit(){
    this.anteproyectoservice.allanteproyectos().then((res:Anteproyectos[])=>{
      this.anteproyectos=res
    })
  }

  @ViewChild(IonModal) modal!: IonModal;

  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    const temporal={"nombre":this.op,"comentario":this.comentario }
    this.anteproyecto.correciones.push(temporal)
    this.anteproyecto.estado="Corregido"
    this.anteproyectoservice.ActualizarAnteproyecto(this.anteproyecto).then((datos)=>{
      if(datos.status==204){
         alert("Actualización exitosa!!!")
      }
    })
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  verproyecto(p:number){
    this.anteproyecto=this.anteproyectos[p]
    console.log(this.anteproyecto)
  }
}
