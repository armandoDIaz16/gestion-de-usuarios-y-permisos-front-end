import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './request-reset.component.html',
})
export class RequestResetComponent implements OnInit {
  public form = {
    email: null
  };
  error: null;

  constructor(
    private Jarvis: JarwisService
  ) { }

  onSubmit() {
    this.Jarvis.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
    sessionStorage.setItem("email", this.form.email);
  }

  handleResponse(res) {
    //this.Notfiy.success(res.data,{timeout:0});
    this.form.email = null;
  }


  handleError(error){
    this.error = error.error.errors;
  }

  ngOnInit() {
    

  }



}