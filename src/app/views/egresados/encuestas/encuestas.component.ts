import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss']
})
export class EncuestasComponent implements OnInit {
  private modalService: any;

  constructor() { }

  public close() {
    this.modalService.destroy();
  }

  ngOnInit() {
  }

}
