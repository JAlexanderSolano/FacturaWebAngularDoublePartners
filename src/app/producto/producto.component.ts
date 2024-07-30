import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {
  _baseURL: string = "https://localhost:44345/api/"
  result: string = ""
  producto = {
    nombreProducto: '',
    ImagenProducto: '',
    PrecioUnitario: '',
    Existencias: '0'
  }
  archivos: any = [];
  data: any[] = []
  previsualizacion:string = ""; 
  ngOnInit(): void {

  }
  constructor(private sanitizer:DomSanitizer, private router: Router) { }
  GuardarProducto() {
    console.log(this.producto)
    fetch(this._baseURL + 'Producto/GuardarProducto',{
      method:'POST',
      body: JSON.stringify({
        nombreProducto: this.producto.nombreProducto,
        ImagenProducto: this.producto.ImagenProducto,
        PrecioUnitario: this.producto.PrecioUnitario,
        ext: parseInt(this.producto.Existencias)        
      }),
      headers:{
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then((response) => response.json())
    .then((json)=> this.Mensaje(json))
  }
  Regresar(){
    this.router.navigate([''])
  }
  Mensaje(json:any){
    this.data = json
    this.data.forEach(item => {
      this.result = item.result
   });

    if(this.result == "Registro guardado con exito"){
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
  CapturarImagen(event: any) {
    const archivoCapt = event.target.files[0]
    this.archivos.push(archivoCapt);
    this.extraerBase64(archivoCapt).then((imagen: any) =>{
      this.previsualizacion = imagen.base;
      console.log(imagen.base);
      this.producto.ImagenProducto = imagen.base
    })
  }
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try 
    {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error =>{
        resolve({
          base: null
        });
      };
      return ""
    } catch(e)
    {
      return null;
    }
  });
}
