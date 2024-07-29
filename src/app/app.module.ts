import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ProductoComponent } from './producto/producto.component';
import { FacturaComponent } from './factura/factura.component';
import { RouterModule, Routes } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component:FacturaComponent
  },
  {
    path: 'producto',
    component:ProductoComponent
  },
  {
    path: 'cliente',
    component:ClienteComponent
  }
]


@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ProductoComponent,
    FacturaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)

  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
