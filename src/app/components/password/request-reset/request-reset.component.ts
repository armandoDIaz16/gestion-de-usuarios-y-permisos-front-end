import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-dashboard',
  templateUrl: './request-reset.component.html',
})
export class RequestResetComponent implements OnInit {
  public form = {
    email: null
  };


  constructor(
    private Jarvis: JarwisService,
    private notify: SnotifyService,
    private Notfiy:SnotifyService
  ) { }

  onSubmit() {
    this.Notfiy.info('Wait...' ,{timeout:5000})
    this.Jarvis.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error),
    );
    localStorage.setItem("email", this.form.email);
  }

  handleResponse(res) {
    this.Notfiy.success(res.data,{timeout:0});
    this.form.email = null;
  }

  ngOnInit() {
    

  }



}