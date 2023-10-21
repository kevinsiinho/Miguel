export class Usuario {
  public nombre!:String
  public email!:String
  public password:String=""
  public tipo!:string

  SetValores(item:any){
    this.nombre=item.nombre
    this.email=item.email
    this.password=item.password
    this.tipo=item.rol
  }

}

