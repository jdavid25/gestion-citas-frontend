import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultorioService } from '../consultorio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-consultorio',
  templateUrl: './list-consultorio.component.html',
  styleUrls: ['./list-consultorio.component.css']
})
export class ListConsultorioComponent implements OnInit {

  consultorios: any[] = [];

  constructor(private consultorioService: ConsultorioService,
              private router: Router) { }

  ngOnInit(): void {
    this.cargarConsultorios();
  }

  cargarConsultorios(){
    this.consultorioService.getConsultorios().subscribe(res =>{
      if(res.status){
        this.consultorios = res.consultorios;
      }
    });
  }

  onCrear():void{
    this.router.navigate(['/consultorio/form']);
  }

  onEditar(consultorio: any):void{
    this.router.navigate(['/consultorio/form'], { state: { consultorio: consultorio}});
  }

  onEliminar(consultorio:any):void{
    Swal.fire({
      title: 'Está seguro de eliminar el consultorio "'+consultorio.nombre+'" ?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.consultorioService.eliminarConsultorio(consultorio.id).subscribe(res => {
          if(res.status){
            Swal.fire(
              'Exito!',
              `El consultorio ${res.consultorio.nombre} ha sido eliminado`,
              'success'
            );
            this.cargarConsultorios();
          }else{
            Swal.fire(
              'Error!',
              `El consultorio ${res.consultorio.nombre} no ha sido eliminado`,
              'error'
            );
          }
        });
      }
    });
  }
}
