import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD

=======
>>>>>>> 16749e7fd1cc63919391e6c6fdd8c441cc05274d

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
