import { Component, OnInit } from '@angular/core';
//import { ModalService } from ;


@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss']
})
export class EncuestasComponent implements OnInit {
  //private modalService: any;

  constructor() { }

  public close() {
    //this.modalService.destroy();
  }

  ngOnInit() {
  }
  mostrar(id) {}

}
