import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GenericServicesService } from './generic-services.service';
import { ICampus, sSEspacio, sSEdificio, sSBusqueda } from '../views/servicio_social/_models/convocatorias'


@Injectable({
  providedIn: 'root'
})
export class ServicioSocialService extends GenericServicesService {

  constructor(private http: HttpClient,
    private genericServicesService: GenericServicesService) {super(http);}

    private baseUrl = GenericServicesService.API_ENDPOINT;
    private headers = GenericServicesService.HEADERS;

    /*----------------SERVICES PARA LA CONVOCATORAIS-----------------*/
    addConvocatoria(datos){
      console.log('addConvocatoria');
      console.log(datos);
      return this.http.post(this.baseUrl + 'saveConvocatoria',datos, this.headers).subscribe(
        (Response)=>{
          console.log(Response);
        }
      );
    }

    getBusqueda(data):Observable<sSBusqueda[]>{
      return this.http.get<sSBusqueda[]>(this.baseUrl+ 'busquedaConvocatoria/'+data,this.headers);
    }
    async allBusqueda(){
      return this.http.get<sSBusqueda[]>(this.baseUrl+ 'allConvocatoria/',this.headers).toPromise();
    }
    getCampus(data):Observable<ICampus[]>{
      return this.http.get<ICampus[]>(this.baseUrl + 'getCampus/'+data,this.headers);
    }
    getEdificios(data):Observable<sSEdificio[]>{
      return this.http.get<sSEdificio[]>(this.baseUrl + 'getEdificios/'+data,this.headers);
    }
    getEspacio(data):Observable<sSEspacio[]>{
      return this.http.get<sSEspacio[]>(this.baseUrl +'getSalones/'+data,this.headers);
    }
    getPdfConvocatoria(id){
     this.http.get(this.baseUrl+"convocatoriaPdf/"+id, this.headers).subscribe();
    }

    /*--------------FIN SERVICES PARA CONVOCATORIAS ------------------*/

}
