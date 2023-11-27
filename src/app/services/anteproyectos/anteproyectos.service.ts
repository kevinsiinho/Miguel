import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Anteproyectos } from 'src/app/modelos/anteproyectos/anteproyectos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnteproyectosService {


  public url = environment.url
  public anteproyectos:Anteproyectos[]=[];
  public anteproyecto= new Anteproyectos()

  constructor(
  ) { }


async allanteproyectos(){
  const { value } = await Preferences.get({ key: 'token' });
    this.anteproyectos=[]
    const options = {
      url: this.url+'/anteproyectos',
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
   }
    };
  const response: HttpResponse = await CapacitorHttp.get(options);

        response.data.forEach((item:any)=> {
          this.anteproyecto=new Anteproyectos();
          this.anteproyecto.SetValores(item)
          this.anteproyectos.push(this.anteproyecto)
        });
        return this.anteproyectos;
  }

 async Nuevoanteproyecto(anteproyecto:Anteproyectos){
  console.log(anteproyecto)
  const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'/anteproyectos',
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      data:anteproyecto
      };
    const response: HttpResponse = await CapacitorHttp.post(options);
          if(response.status==200){
             alert("Creado")
          }else{
            alert("Error")
          }
          return response
   };

async Unanteproyecto(){
    const { value } = await Preferences.get({ key: 'token' });
      const options = {
        url:this.url+"",
        headers: { "Content-Type": "application/json",
        "Authorization": 'Bearer ' + value
        }
      };
        const response: HttpResponse = await CapacitorHttp.get(options);

        this.anteproyecto=new Anteproyectos()
        this.anteproyecto.SetValores(response.data[0])
  }

  async ActualizarAnteproyecto(id:String,anteproyecto:Anteproyectos){
    const { value } = await Preferences.get({ key: 'token' });
    this.anteproyectos=[]
    const options = {
      url: this.url+'/anteproyectos/'+id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      data:anteproyecto
    };

  const response: HttpResponse = await CapacitorHttp.put(options);
          if(response.status==204){
              alert("Actualizado")
          }else{
            alert("Error")
          }
          return response
  }

}
