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
  const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'/anteproyectos',
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      data:anteproyecto
      };
    const response: HttpResponse = await CapacitorHttp.post(options);
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

  async ActualizarAnteproyecto(anteproyecto:Anteproyectos){
    const { value } = await Preferences.get({ key: 'token' });
    this.anteproyectos=[]
    const options = {
      url: this.url+'/anteproyectos/'+anteproyecto.id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      data:anteproyecto
    };

  const response: HttpResponse = await CapacitorHttp.put(options);
      return response
  }

}
