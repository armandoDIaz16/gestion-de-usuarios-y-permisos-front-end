import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';
import { TokenService } from '../../../services/token.service';
import { Router } from '@angular/router';
//import * as $ from 'jquery';
@Component({
  selector: 'app-form_alumno',
  templateUrl: './form_alumno.component.html',
  styleUrls: ['./form_alumno.component.scss']
})
export class Form_alumnoComponent implements OnInit {

  public form ={
    email:null,
     //name:null,
     name:localStorage.getItem("nombre"),
     password:null,
     password_confirmation:null,
     curp: null,
     control : null,
     apep: null,
     apem: null,
     carrera: null,
     celular: null,
     dia: null,   
   };
 
   public error = [];
 
   constructor (private Jarwis: JarwisService,
     private Token : TokenService,
     private router : Router) { }
 
   onSubmit(){
     alert(this.form.dia)
    }
 
   handleResponse(data){
     this.Token.handle(data.access_token);
     this.router.navigateByUrl('/home');
   }
 
 
   handleError(error){
     this.error= error.error.errors;
   }
 
   ngOnInit() {
   /*  $(document).ready(function() {

      var last_valid_selection = null;
      
      $('#dia').change(function(event) {
      
        if ($(this).val().length > 3) {
      
          $(this).val(last_valid_selection);
        } else {
          last_valid_selection = $(this).val();
        }
      });
      }); */
   }
 
}