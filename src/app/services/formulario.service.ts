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
        return this.http.get<IBachillerato[]>(this.baseUrl+'Bachillerato/' + ciudad);
    }  
    getCarreraUniversidad():Observable<ICarreraUniversidad[]>{
        return this.http.get<ICarreraUniversidad[]>(this.baseUrl+'Carrera_Universidad');
      }
      getCarrera(pkPeriodo):Observable<ICarrera[]>{
        return this.http.get<ICarrera[]>(this.baseUrl+'Carrera/'+pkPeriodo);
      }
      getCiudad(entidadFederativa):Observable<ICiudad[]>{
        return this.http.get<ICiudad[]>(this.baseUrl+'Ciudad/'+entidadFederativa);
      }
      getColonia(cp):Observable<IColonia[]>{
        return this.http.get<IColonia[]>(this.baseUrl+'Colonia/'+cp);
      }
      getDependencia():Observable<IDependencia[]>{
        return this.http.get<IDependencia[]>(this.baseUrl+'Dependencia');
      }
      getEntidadFederativa():Observable<IEntidadFederativa[]>{
        return this.http.get<IEntidadFederativa[]>(this.baseUrl+'Entidad_Federativa');
      }
      getEstadoCivil():Observable<IEstadoCivil[]>{
        return this.http.get<IEstadoCivil[]>(this.baseUrl+'Estado_Civil');
      }
      getIncapacidad():Observable<IIncapacidad[]>{
        return this.http.get<IIncapacidad[]>(this.baseUrl+'Incapacidad');
      }
      getPropagandaTecnologico():Observable<IPropagndaTecnologico[]>{
        return this.http.get<IPropagndaTecnologico[]>(this.baseUrl+'Propaganda_Tecnologico');
      }
      getUniversidad():Observable<IUniversidad[]>{
        return this.http.get<IUniversidad[]>(this.baseUrl+'Universidad');
      }

}