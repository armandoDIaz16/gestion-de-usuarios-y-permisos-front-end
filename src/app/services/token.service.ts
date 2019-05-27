import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login : 'http://10.0.31.11/backend_swiitl/server.php/api/login',
    signup : 'http://10.0.31.11/backend_swiitl/server.php/api/signup'
  }

  constructor() { }

  handle(token){
    this.set(token);
  }

  set(token){
    sessionStorage.setItem('token',token);
  }

  get(){
    return sessionStorage.getItem('token');
  }

  remove(){
    sessionStorage.removeItem('token'); 
  }

  isValid(){
    const token = this.get();
    if(token){
      const payload = this.payload(token);
      if(payload){
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token){
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload)
  {
    return JSON.parse(atob(payload));   
  }

  loggedIn(){
    return this.isValid();
  }
  
}
