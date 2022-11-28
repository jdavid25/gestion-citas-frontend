import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from '../agenda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-agenda',
  templateUrl: './list-agenda.component.html',
  styleUrls: ['./list-agenda.component.css']
})
export class ListAgendaComponent implements OnInit {

  persona:any;
  agendaList:any[] = [];

  constructor(private agendaService: AgendaService, 
              private router: Router) {
    if(this.router.getCurrentNavigation()?.extras?.state){
      this.persona = this.router.getCurrentNavigation()?.extras?.state?.['persona'];
    }
  }

  ngOnInit(): void {
    this.cargarAgendaList();
  }

  onRegresar(){
    this.router.navigate(['/medico']);
  }

  cargarAgendaList(){
    this.agendaService.getAgenda(this.persona.id).subscribe(res =>{
      if(res.status){
        this.agendaList = res.agendaList;
      }
    });
  }

  onCrear():void{
    this.router.navigate(['/agenda/form'], { state: { persona: this.persona}});
  }

  onEditar(agenda: any):void{
    this.router.navigate(['/agenda/form'], { state: { agenda: agenda, persona: this.persona}});
  }

  onEliminar(agenda:any):void{
    Swal.fire({
      title: `Está seguro de eliminar la agenda ${agenda.id} - ${agenda.fecha} ${agenda.hora}?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.agendaService.eliminarAgenda(agenda.id).subscribe(res => {
          if(res.status){
            Swal.fire(
              'Exito!',
              `la agenda ha sido eliminada`,
              'success'
            );
            this.cargarAgendaList();
          }else{
            Swal.fire(
              'Error!',
              `la agenda no ha sido eliminada`,
              'error'
            );
          }
        });
      }
    });
  }
}
