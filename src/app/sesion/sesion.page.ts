import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.page.html',
  styleUrls: ['./sesion.page.scss'],
})
export class SesionPage implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }


  verificar(){

    console.log("entró")
    this.route.navigate(['/tabs/tab1'])
  }
}
