import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD

=======
>>>>>>> 9941b46248d4f757da7405609c3bdadfd5d3e406

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
