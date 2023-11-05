export class Anteproyectos {
  public id?:String
  public descripciones!:String
  public plateamiento!:String
  public hipotesis!:String
  public objetivo!:String
  public justificacion!:string
  public titulo!:string
  public estado!:string
  public idusuario!:string
  public correciones:any[]=[]
  SetValores(item:any){
    this.id=item.id
    this.descripciones=item.descripciones
    this.plateamiento=item.plateamiento
    this.hipotesis=item.hipotesis
    this.objetivo=item.objetivo
    this.justificacion=item.justificacion
    this.titulo=item.titulo
    this.estado=item.estado
    this.idusuario=item.idusuario
    this.correciones=item.correciones
  }

}
