import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit{
  _baseURL : string = "https://localhost:44345/api/"
  tipoCliente: any[] = []; 
  cliente={
    razonSocial: '',
    idTipoCliente: '',
  }

  ngOnInit(){
    this.CargarTipoUsuario();
  }
  RegistrarCliente(){
    console.log(this.cliente)
  }
  CargarTipoUsuario(){
    fetch(this._baseURL + 'Control')
    .then((response) => response.json())
    .then((json)=> this.tipoCliente = json)
  }
}
