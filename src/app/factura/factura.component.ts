import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent {
  constructor(private router:Router){}

  Cliente(){
    this.router.navigate(['cliente'])
  }
  Producto(){
    this.router.navigate(['producto'])
  }
  Factura(){
    this.router.navigate(['detalle-factura'])
  }
}
