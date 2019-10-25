import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericServicesService } from '../../../services/generic-services.service';
import { HttpClient} from '@angular/common/http';
import { ValidarModuloService } from '../../../services/validarModulo.service';
import { ServicioSocialService } from '../../../services/servicio-social.service';
import { LugarExamenService } from '../../../services/lugar-examen.service';
import { convocatorias, ICampus, sSEspacio, sSEdificio, datoConvocatoria, sSBusqueda } from '../_models/convocatorias';
import { text } from '@angular/core/src/render3';


@Component({
  selector: 'app-crear-convocatoria',
  templateUrl: './crear-convocatoria.component.html',
  styleUrls: ['./crear-convocatoria.component.scss'],
  providers: [ ServicioSocialService ,ValidarModuloService,LugarExamenService]
})

export class CrearConvocatoriaComponent extends GenericServicesService implements OnInit {

  //Datos de usuario por sesion , segun donde inicie sesion   
  edificio:sSEdificio[] = [];
  espacio:sSEspacio[] = [];
  campus:ICampus[] = [];

  
  //Datos para Ayudar en la contruccion del formualrio
  institutoSelect:string;
  espacioSelect:string;

  NO_CONTROL_CONV:string;
  campusSelect:string;
  edificioSelect:string;
  FK_ESPACIO_CONVOCATORIA:string;
  TURNO:string;
  FECHA_CONVOCATORIA:string;
  PERIODO:string;




  horaInicio:string;
  horaFin:string;
  //Arreglos para mostrar datos solicitados
  

  //jalar los arreglos de los lugares en la base de datos
  private baseUrl = GenericServicesService.API_ENDPOINT;
  lugarAndKey:string;
  fecha:Date;
  nControl:string[]=['1424','1524'];
  turno:string[]=['Matutino', 'Vespertino'];
  periodo:string[]=['ENE-JUN','JUL-DIC'];
  saveConvo:convocatorias={NO_CONTROL_CONV:'',DATOS:[{TURNO:'',FECHA_CONVOCATORIA:'',FK_ESPACIO_CONVOCATORIA:'',HORARIO_CONVOCATORIA:'',PERIODO:''}]};  

  //datos para el buscador
  buscaFecha:Date;
  buscaPeriodo:string;
  buscaConvo:sSBusqueda[] =[];
  aP:String[] =[];

  constructor(
      private http:HttpClient,
      private validarModuloService:ValidarModuloService,
      private _lugarExamenService:LugarExamenService,
      private _servicioSocialService:ServicioSocialService
              ) {super(http);}

  public mostrarModulo = false;

  
  ngOnInit() {

    this.mostrarModulo = this.validarModuloService.getMostrarModulo('Convocatorias');
    if (!this.mostrarModulo) {
        return;
    }
    //this._lugarExamenService.getEdificio().subscribe(data => this.edificio = data);
    this._servicioSocialService.getCampus('1').subscribe(data => this.campus = data);

  } 
  addSemiConvo(){
    this.saveConvo.DATOS[this.saveConvo.DATOS.length-1]['TURNO']=this.TURNO;
    this.saveConvo.DATOS[this.saveConvo.DATOS.length-1]['FECHA_CONVOCATORIA']=this.FECHA_CONVOCATORIA;
    this.saveConvo.DATOS[this.saveConvo.DATOS.length-1]['FK_ESPACIO_CONVOCATORIA']=this.FK_ESPACIO_CONVOCATORIA;
    this.saveConvo.DATOS[this.saveConvo.DATOS.length-1]['PERIODO']=this.PERIODO;
    this.saveConvo.DATOS[this.saveConvo.DATOS.length-1]['HORARIO_CONVOCATORIA']=this.horaInicio+'-'+this.horaFin;

    this.addConvo();

  }

  crearConvo(){
    this.saveConvo.NO_CONTROL_CONV=this.NO_CONTROL_CONV;
    if(this.saveConvo){
      this.saveConvo['DATOS'].pop();
      console.log(this.saveConvo);
      this._servicioSocialService.addConvocatoria(JSON.stringify(this.saveConvo));
      setTimeout(() => {
        this.saveConvo={NO_CONTROL_CONV:'',DATOS:[{TURNO:'',FECHA_CONVOCATORIA:'',FK_ESPACIO_CONVOCATORIA:'',HORARIO_CONVOCATORIA:'',PERIODO:''}]};  
        this.NO_CONTROL_CONV="";
        this.campusSelect="";
        this.edificioSelect="";
        this.FK_ESPACIO_CONVOCATORIA="";
        this.TURNO="";
        this.FECHA_CONVOCATORIA="";
        this.PERIODO="";
        this.horaInicio="";
        this.horaFin="";
      }, 500);
    }else{
      console.log('No se puede crear si esta vacia');
    }
  }

  addConvo(){
    this.saveConvo.DATOS.push({TURNO:'',FECHA_CONVOCATORIA:'',FK_ESPACIO_CONVOCATORIA:'',HORARIO_CONVOCATORIA:'',PERIODO:''});
  }

  dropLast(index:number){
        this.saveConvo['DATOS'].splice(index,1);
       // this.saveConvo.pop();
  }

  saveVacia(){
    if(this.saveConvo['DATOS'].length>1)
    return true;
    else return false;
  }

  lastOne(index:number){
    var i = index++;
    if(this.saveConvo['DATOS'].length===index){
      return false;
    }else if(index<this.saveConvo['DATOS'].length){
      return true;
    }  
  }

  last(index:number){
    if(this.buscaConvo.length===index){
      return false;
    }else if(index<this.buscaConvo.length){
      return true;
    }  
  }
  
  hideBtn(){
    if(this.saveConvo['DATOS'].length>1)
    return true;
    else return false;
  }

  showConvocatoria(i){
    this._servicioSocialService.getPdfConvocatoria(i);
    const win = window.open(this.baseUrl+"convocatoriaPdf/"+i, '_blank');
    win.focus();
  }

  async buscaConvobtn(){

      //if en caso de que que se busqu epor algun parametro
    if(this.buscaPeriodo || this.buscaFecha){
      //if en caso de que busque con ambso parametros
      if(this.buscaPeriodo && this.buscaFecha){
      this.aP.push(this.buscaFecha.toString());
      this.aP.push(this.buscaPeriodo);
      this._servicioSocialService.getBusqueda(this.aP).subscribe(data => this.buscaConvo = data);
      this.aP = [];  
      this.buscaFecha=null;
      this.buscaPeriodo=null;
          // else if para busqueda por periodo
      }else if(this.buscaPeriodo){

        
        this._servicioSocialService.getBusqueda(this.buscaPeriodo).subscribe(data => this.buscaConvo = data);
        this.buscaPeriodo=null;

        //else if para busqueda por fecha
      }else if(this.buscaFecha){

        this._servicioSocialService.getBusqueda(this.buscaFecha).subscribe(data => this.buscaConvo = data);
        this.buscaFecha=null;
      }
      //else para busqueda rpedeterminada
    }else{
      const data = await this._servicioSocialService.allBusqueda();
      this.buscaConvo = data;
    }
  }

  //Seleccionar Datos segun lo Seleccionado 

  campusChange(){
    this._servicioSocialService.getEdificios(this.campusSelect).subscribe(data => this.edificio = data);
  }
  edificioChange(){
    this._servicioSocialService.getEspacio(this.edificioSelect).subscribe(data => this.espacio = data);
  }


}

