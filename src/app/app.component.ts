import { Component } from '@angular/core';
import { ConsumorestService } from './service/consumorest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'demo';

  //Se procede a crear un arreglo vacio
  usuario:any=[];
  //se procede a llamar el servicio en el construcctor de la clase
  constructor(public rest: ConsumorestService){}

  //Para llamar al metodo y que se carge
  //componente el momento que se carge la prueba
  ngOnInit(){
    this.getUsuario();
  }

  //metodo para optener las categorias del servicio
  getUsuario(){
    //Referencia al array
    this.usuario = [];
    this.rest.getUsuariosRest

    //capturar en consola Y en el array
    this.rest.getUsuariosRest().subscribe(data=>{
      console.log(data);
      this.usuario = data;
    });
  }

}
