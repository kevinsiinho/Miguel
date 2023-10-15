import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  constructor() {}
  public db=[

    {
      "name":"titulo",
      "texto":"la luna",
      "comentarios":["hola","hola2","hola","hola2","hola","hola2","hola","hola2"],
      "estado":"enviado"

    },
    {
      "name":"objetivo",
      "texto":"ir a la luna",
      "comentarios":["hola3","hola4"],
      "estado":"pendiente"
    },
    {
      "name":"descripcion",
      "texto":"ir a la luna",
      "comentarios":["hola5","hola6"],
      "estado":"revisado"
    },
    {
      "name":"justificacion",
      "texto":"recoger algo",
      "comentarios":["hola8","hola9"],
      "estado":"pendiente"
    }

  ]
}
