import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericServicesService } from '../../../services/generic-services.service';
import { HttpClient} from '@angular/common/http';
import { ValidarModuloService } from '../../../services/validarModulo.service';
@Component({
  selector: 'app-crear-convocatoria',
  templateUrl: './crear-convocatoria.component.html',
  styleUrls: ['./crear-convocatoria.component.scss'],
  providers: [ValidarModuloService]
})

export class CrearConvocatoriaComponent extends GenericServicesService implements OnInit {
  //jalar los arreglos de los lugares en la base de datos
  fecha:Date;
  nControl:string[]=['1424','1524'];
  turno:string[]=['Matutino', 'Vespertino'];
  lugar:string[]=['Aula Magna','Sala Computo','Auditorio'];
  horario:string;
  campus:string[]=['I','II'];
  periodo:string[]=['Diciembre','Julio'];
  convo:convoca[]=[{campus:'',noControl:'',turno:'',fecha:'',lugar:'',horario1:'',horario2:'',periodo:''}];
  saveConvo:convoca[]=[{campus:'',noControl:'',turno:'',fecha:'',lugar:'',horario1:'',horario2:'',periodo:''}];  

  //valores Seleccionados
  selectCampus:string;
  selectNContorl:string;
   
  //datos que se agregaran  a la nueva convocatoria 
  checkVal:number;//0 fasle 1 true
  addConvot:any[]=[{campus:'',noControl:'',turno:'',fecha:'',lugar:'',horario1:'',horario2:'',periodo:'',add:''}]; 

  //datos para el buscador
  buscaFecha:Date;
  buscaPeriodo:string;
  buscaConvo:convoca[];

  constructor(
      private http:HttpClient,
      private validarModuloService:ValidarModuloService,
              ) {super(http);}

  public mostrarModulo = false;

  
  ngOnInit() {

    this.mostrarModulo = this.validarModuloService.getMostrarModulo('convocatorias');
    if (!this.mostrarModulo) {
        return;
    }
    
  }

  addSemiConvo(){
    this.saveConvo[this.saveConvo.length-1]=this.convo[0];
    this.addConvo();
    this.convo=[{campus:'',noControl:'',turno:'',fecha:'',lugar:'',horario1:'',horario2:'',periodo:''}];
  }

  crearConvo(){
    alert('convo Creada');
  }

  addConvo(){
    this.saveConvo.push({campus:'',noControl:'',turno:'',fecha:'',lugar:'',horario1:'',horario2:'',periodo:''});
  }

  dropLast(index:number){
        this.saveConvo.splice(index,1);
       // this.saveConvo.pop();
  }

  saveVacia(){
    if(this.saveConvo.length>1)
    return true;
    else return false;
  }

  lastOne(index:number){
    var i = index++;
    if(this.saveConvo.length===index){
      return false;
    }else if(index<this.saveConvo.length){
      return true;
    }
    
  }
  
  hideBtn(){
    if(this.saveConvo.length>1)
    return true;
    else return false;
  }
  hideBuscarBtn(index:number){
    var i = index++;
    if(this.buscaConvo.length===index){
      return false;
    }else if(i<this.buscaConvo.length){
      return true;
    }
  }

  buscaConvobtn(){
    //if en caso de la base este vacia
    this.buscaConvo=[{campus:'',noControl:'',turno:'',fecha:'',lugar:'',horario1:'',horario2:'',periodo:''}];
    if(this.saveConvo && this.saveVacia()){
      //if en caso de que que se busqu epor algun parametro
    if(this.buscaPeriodo || this.buscaFecha){
      let c = 0;
      //if en caso de que busque con ambso parametros
      if(this.buscaPeriodo && this.buscaFecha){
        for(let i=0;i<this.saveConvo.length;i++){
          if(this.buscaPeriodo==this.saveConvo[i]['periodo']
          && this.buscaFecha.toString()==this.saveConvo[i]['fecha']){
            this.buscaConvo[c]=this.saveConvo[i];
            c++;
          }
        }
        this.buscaFecha=null;
        this.buscaPeriodo=null;
          // else if para busqueda por periodo
      }else if(this.buscaPeriodo){
        for(let i=0;i<this.saveConvo.length;i++){
          if(this.buscaPeriodo==this.saveConvo[i]['periodo']){
            this.buscaConvo[c]=this.saveConvo[i];
            c++;
          }
        }
        if(this.buscaConvo[0]['periodo']==''){
          this.buscaConvo=null;
        }
        this.buscaPeriodo=null;

        //else if para busqueda por fecha
      }else if(this.buscaFecha){
          for(let i=0;i<this.saveConvo.length;i++){
            if(this.buscaFecha.toString()==this.saveConvo[i]['fecha']){
              this.buscaConvo[c]=this.saveConvo[i];
              c++;
            }
          }
          if(this.buscaConvo[0]['fecha']==''){
              this.buscaConvo=null;
          }
        this.buscaFecha=null;
      }
      //else para busqueda rpedeterminada
    }else{
      for(let i=0;i<this.saveConvo.length;i++){
        this.buscaConvo[i]=this.saveConvo[i];
      }
    }
  }else {
    alert('No se encontraron resultados');
  }
  }


}
interface convoca{
  campus:string;
  noControl:string;
  turno:string;
  fecha:string;
  lugar:string;
  horario1:string;
  horario2:string;
  periodo:string;
}
