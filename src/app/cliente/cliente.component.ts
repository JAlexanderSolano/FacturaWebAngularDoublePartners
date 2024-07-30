import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit{
  _baseURL : string = "https://localhost:44345/api/"
  tipoCliente: any[] = []; 
  _data: any[] = [];
  result: string = ""
  cliente={
    razonSocial: '',
    idTipoCliente: '0',
  }

  constructor(private router:Router) {  }
  ngOnInit(){
    this.CargarTipoUsuario();
  }
  RegistrarCliente(){

    fetch(this._baseURL + 'Cliente/RegistraCliente',
      {
        method: 'POST',
        body: JSON.stringify({
          Parametro: 1,
          IdCliente : 0,
          RazonSocial: this.cliente.razonSocial,
          idTipoCliente: parseInt(this.cliente.idTipoCliente)
        }),
        headers:{
          'Content-type': 'application/json; charset=UTF-8'
        }
      }
    )
    .then((response)=> response.json())
    .then((json)=> this.Mensaje(json))

  }
  CargarTipoUsuario(){
    fetch(this._baseURL + 'Control')
    .then((response) => response.json())
    .then((json)=> this.tipoCliente = json)
  }
  Mensaje(_json:any){
    this._data = _json
    this._data.forEach(item =>{
       this.result = item.result
    })

    if(this.result == "Cliente Registrado con exito"){
      Swal.fire({ 
        title:'Exito', 
        text: this.result, 
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      }).then((_result)=>{
        if(_result.isDismissed){
          this.router.navigate([''])
        }
      });
    }else{
      Swal.fire({ 
        title:'Error', 
        text: this.result, 
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    }

  }
}
