import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './request-reset.component.html',
})
export class RequestResetComponent implements OnInit {
  public form = {
    CURP: null
  };
  public error = null;

  constructor(private Jarvis: JarwisService) { }

  onSubmit() {
    this.Jarvis.recuperarContrasena(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
    //localStorage.setItem("CURP", this.form.CURP);
  }

  handleResponse(data) {
    //this.Notfiy.success(res.data,{timeout:0});
    this.form.CURP = null;
  }


  handleError(error){
    this.error = error.error.error;
  }

  ngOnInit() {
    

  }



}