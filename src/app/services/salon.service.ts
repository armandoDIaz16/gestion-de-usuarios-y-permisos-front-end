import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ISalon } from './serviciosListas';

@Injectable()
export class SalonService{
  constructor(private http: HttpClient){}
  getSalon():Observable<ISalon[]>{
    return this.http.get<ISalon[]>('http://127.0.0.1:8000/api/Salon');
  }
}
