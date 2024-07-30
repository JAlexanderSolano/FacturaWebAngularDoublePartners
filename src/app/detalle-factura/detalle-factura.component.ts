import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrl: './detalle-factura.component.css'
})
export class DetalleFacturaComponent implements OnInit {
  _baseURL : string = "https://localhost:44345/api/"
  lsClientes: any[] = []
  lsProductos: any[] = []
  factura = {
    cliente: '0',
    idProducto: '0',
    Cantidad: '',
    Nota: ''
  }

  constructor(private router:Router){}

  ngOnInit(): void {
    this.CargarCliente()
    this.CargarProducto()
  }

  CargarCliente() {
    fetch(this._baseURL + 'Control/Cliente')
    .then((response) => response.json())
    .then((json)=> this.lsClientes = json)
  }

  CargarProducto() {
    fetch(this._baseURL + 'Control/Producto')
    .then((response) => response.json())
    .then((json)=> this.lsProductos = json)
  }

  Regresar(){
    this.router.navigate([''])
  }

}
