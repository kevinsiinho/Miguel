import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Usuario } from 'src/app/modelos/usuario/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url = environment.url
  public usuarios:Usuario[]=[];
  public usuario= new Usuario()
  constructor( private router:Router,) { }

  async alluser():Promise<any>{
    this.usuarios=[]
    const options = {
      url: this.url+'/signup'
    };

  const response: HttpResponse = await CapacitorHttp.get(options);
    console.log(response.data)
        response.data.forEach((item:any)=> {
          this.usuario=new Usuario();
          this.usuario.SetValores(item)
          this.usuarios.push(this.usuario)
        });
        return this.usuarios
  }

  async entrar(email:string, password:string){
   const datos={email:email,password:password}
    const options = {
      url: this.url+'/users/login/',
      headers: { "Content-Type": "application/json" },
      data: datos
    };

  const response: HttpResponse = await CapacitorHttp.post(options);
   return response
  }

  async Quien(token:string){
    const options = {
      url: this.url+'/whoAmI',
      headers: { "Content-Type": "application/json",
                  "Authorization": 'Bearer ' + token
               }
    };

  const response: HttpResponse = await CapacitorHttp.get(options);
       return response
  }

  async crearusuario(usuario:Usuario){
    const options = {
      url: this.url+'/signup',
      headers: { "Content-Type": "application/json" },
      data: usuario
      };
    const response: HttpResponse = await CapacitorHttp.post(options);
    if (response.status==200) {
      alert("Usuario guardado exitosamente")
      this.router.navigate(['sesion'])
    }else{
      alert("Error en el servidor")

    }
  };
}
