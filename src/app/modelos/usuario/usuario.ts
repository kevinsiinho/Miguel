export class Usuario {
  public id!:String
  public nombre!:String
  public email!:String
  public password:String=""
  public tipo!:string

  SetValores(item:any){
    this.id=item.id
    this.nombre=item.nombre
    this.email=item.email
    this.password=item.password
    this.tipo=item.rol
  }

}

