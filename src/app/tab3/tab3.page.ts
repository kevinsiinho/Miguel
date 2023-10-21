import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private route:Router) {}

 async salir(){
    await Preferences.remove({ key: 'token' });
    alert("Vuelve pronto")
    this.route.navigate(['/sesion'])
  }
}
