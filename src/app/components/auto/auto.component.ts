import { Component, OnInit } from '@angular/core';
import { ConsumorestService } from 'src/app/service/consumorest.service';
import { ConsumofirebaseService } from 'src/app/service/consumofirebase.service';
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})
export class AutoComponent implements OnInit {

  public autos: any = [];
  public documentID = null;
  public currentStatus = 1;


  constructor(private fs: ConsumofirebaseService) {

    this.newAutoForm.setValue({
      idF: "",
      marcaF: "",
      modeloF: "",
      anioF: "",
      urlF: ""
    });

  }

  //METODO PARA CARGAR LOS DATOS EN LOS CAMPOS DEL FORMULARIO
  //POSTERIORMENTE A ELLO REALIZAR EL ACTUALIZAR

  public actualizarAuto(documentID) {
    let editSubcribe = this.fs.obtenerAutoId(documentID).subscribe(
      (data) => {
        this.currentStatus = 2;
        this.documentID = documentID;
        this.newAutoForm.setValue({
          idF: documentID,
          marcaF: data.payload.data()['marca'],
          modeloF: data.payload.data()['modelo'],
          anioF: data.payload.data()['anio'],
          urlF: data.payload.data()['url'],

        })
        editSubcribe.unsubscribe();
      }

    );
  }

  //METODO PARA ACTUALIZAR Y AGREGAR UN  NUEVO AUTO

  public nuevoAuto(form, documentID = this.documentID) {

    if (this.currentStatus == 1) {

      let data = {
        marca: form.marcaF,
        modelo: form.modeloF,
        anio: form.anioF,
        url: form.urlF
      }

      this.fs.crearAuto(data).then(
        () => {
          console.log('DOCUMENTO CREADO EXITOSAMENTE');

          this.newAutoForm.setValue(
            {
              idF: '',
              marcaF: '',
              modeloF: '',
              anioF: '',
              urlF: ''
            });

        }, (error) => {
        console.error(error);
      });
    }

    else{
      let data = {
        marca: form.marcaF,
        modelo: form.modeloF,
        anio: form.anioF,
        url: form.urlF
      }

      this.fs.actualizarAuto(documentID, data).then(
        () => {

          this.newAutoForm.setValue(
            {
              marcaF: '',
              modeloF: '',
              anioF: '',
              urlF: ''
            });

            console.log('DOCUMENTO EDITADO EXITOSAMENTE')

        }, (error) => {
        console.error(error);
      });


    }

  
  }



  ngOnInit() {
    this.obtenerAutos();
  }

  public obtenerAutos() {
    this.fs.ObtenerAutos().subscribe((dataDocumentos) => {
      dataDocumentos.forEach((data: any) => {
        this.autos.push({
          id: data.payload.doc.id,
          data: data.payload.doc.data()
        });
        console.log(this.autos);
      })
    });
  }

  //FORMULARIO
  public newAutoForm = new FormGroup({
    marcaF: new FormControl('', Validators.required),
    modeloF: new FormControl('', Validators.required),
    anioF: new FormControl('', Validators.required),
    urlF: new FormControl('', Validators.required),
    idF: new FormControl('')
  });



  //Eliminar auto
  public eliminarAuto(documentID) {

    this.fs.eliminarAuto(documentID).then(
      () => {
        console.log("Documento eliminado");

      }, (error) => {
        console.log(error);
      }
    )
  }



}
