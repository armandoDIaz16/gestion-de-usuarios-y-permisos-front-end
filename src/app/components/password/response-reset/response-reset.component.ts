import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from '../../../services/jarwis.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './response-reset.component.html',
})
export class ResponseResetComponent implements OnInit {
  public error=[];
  public form = {
    email : localStorage.getItem("email"),
    password : null,
    password_confirmation:null,
    resetToken :null
  }
  constructor(
    private route:ActivatedRoute,
    private Jarwis: JarwisService,
    private router:Router
  ) { 
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token']
    });
  }

  onSubmit(){
   this.Jarwis.changePassword(this.form).subscribe(
     data => this.handleResponse(data),
     error => this.handleError(error)
   )
  }
  handleResponse(data){
    
  this.router.navigateByUrl('/home');
  }

  handleError(error){
    this.error = error.error.errors;
  }
  ngOnInit() {
  }

}