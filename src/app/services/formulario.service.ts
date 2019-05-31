import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IBachillerato, ICarreraUniversidad, ICarrera, ICiudad, IColonia, IDependencia, IEntidadFederativa, IEstadoCivil, IIncapacidad, IPropagndaTecnologico, IUniversidad } from './serviciosListas';
import { GenericServicesService } from './generic-services.service';

@Injectable()
export class FormularioService extends GenericServicesService{ 
    
    constructor(private http: HttpClient,
      private genericServicesService: GenericServicesService ){ super(http); }

    private baseUrl = GenericServicesService.API_ENDPOINT;
    private headers = GenericServicesService.HEADERS;

    getBachillerato(ciudad): Observable<IBachillerato[]> {
        return this.http.get<IBachillerato[]>(this.baseUrl+'Bachillerato/' + ciudad, this.headers);
    }  
    getCarreraUniversidad():Observable<ICarreraUniversidad[]>{
        return this.http.get<ICarreraUniversidad[]>(this.baseUrl+'Carrera_Universidad', this.headers);
      }
      getCarrera():Observable<ICarrera[]>{
        return this.http.get<ICarrera[]>(this.baseUrl+'Carrera', this.headers);
      }
      getCiudad(entidadFederativa):Observable<ICiudad[]>{
        return this.http.get<ICiudad[]>(this.baseUrl+'Ciudad/'+entidadFederativa, this.headers);
      }
      getColonia(cp):Observable<IColonia[]>{
        return this.http.get<IColonia[]>(this.baseUrl+'Colonia/'+cp, this.headers);
      }
      getDependencia():Observable<IDependencia[]>{
        return this.http.get<IDependencia[]>(this.baseUrl+'Dependencia', this.headers);
      }
      getEntidadFederativa():Observable<IEntidadFederativa[]>{
        return this.http.get<IEntidadFederativa[]>(this.baseUrl+'Entidad_Federativa', this.headers);
      }
      getEstadoCivil():Observable<IEstadoCivil[]>{
        return this.http.get<IEstadoCivil[]>(this.baseUrl+'Estado_Civil', this.headers);
      }
      getIncapacidad():Observable<IIncapacidad[]>{
        return this.http.get<IIncapacidad[]>(this.baseUrl+'Incapacidad', this.headers);
      }
      getPropagandaTecnologico():Observable<IPropagndaTecnologico[]>{
        return this.http.get<IPropagndaTecnologico[]>(this.baseUrl+'Propaganda_Tecnologico', this.headers);
      }
      getUniversidad():Observable<IUniversidad[]>{
        return this.http.get<IUniversidad[]>(this.baseUrl+'Universidad', this.headers);
      }

}