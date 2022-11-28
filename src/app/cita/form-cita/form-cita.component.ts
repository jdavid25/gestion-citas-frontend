import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from 'src/app/agenda/agenda.service';
import Swal from 'sweetalert2';
import { CitaService } from '../cita.service';

@Component({
  selector: 'app-form-cita',
  templateUrl: './form-cita.component.html',
  styleUrls: ['./form-cita.component.css']
})
export class FormCitaComponent implements OnInit {

  error:boolean = false;
  msg:string = 'No se ha podido crear la cita';
  persona: any;
  agendaList: any[] = [];
  filtro:any = {};
  fechaFiltro:any;
  nuevaCita:any = {};
  cita:any;
  descripcion:string = '';

  constructor(private citaService: CitaService,
    private agendaService: AgendaService,
    private router: Router) {
    
    if(this.router.getCurrentNavigation()?.extras?.state){
      this.persona = this.router.getCurrentNavigation()?.extras?.state?.['persona'];
      this.filtro.id_departamento = this.persona.id_departamento;

      this.cita = this.router.getCurrentNavigation()?.extras?.state?.['cita'];
      if(this.cita){
        this.descripcion = this.cita.descripcion;
      }
    }
  }

  ngOnInit(): void {
    this.cargarAgendaDisponible();
  }

  onRegresar(){
    this.router.navigate(['/cita'],{state: {persona: this.persona}});
  }

  onFiltrar(){
    this.filtro.fecha = this.fechaFiltro;
    this.cargarAgendaDisponible();
  }
  
  onLimpiarFiltro(){
    this.filtro.fecha = null;
    this.cargarAgendaDisponible();
  }

  cargarAgendaDisponible(){
    this.agendaService.getAgendaDisponible(this.filtro).subscribe(res =>{
      if(res.status){
        this.agendaList = res.agendaList;
      }
    })
  }

  onSeleccionar(agenda: any){
    Swal.fire({
      title: 'Descripción del motivo de la cita',
      input: 'textarea',
      inputValue: this.descripcion,
      showCancelButton: true,
      confirmButtonText: 'Reservar',
      showLoaderOnConfirm: true,
      preConfirm: (descripcion) => {
        if(descripcion == ""){
          Swal.showValidationMessage('La descripción es requerida!')
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        if(!this.cita){
          this.nuevaCita.agenda_id = agenda.id;
          this.nuevaCita.persona_id = this.persona.id;
          this.nuevaCita.descripcion = result.value;
          this.citaService.crearCita(this.nuevaCita).subscribe(res => { console.log(res);
            if(res.status){
              Swal.fire(
                'Exito!',
                `La cita ha sido creada`,
                'success'
              );
              this.router.navigate(['cita'], { state: { persona: this.persona } } );
            }else{
              this.msg = 'No se ha podido crear la agenda';
              this.error = true;
              if(res.show){
                Swal.fire(
                  'Error!',
                  res.message,
                  'error'
                );
              }
            }
          });
        }else{
          this.cita.agenda_id = agenda.id;
          this.cita.descripcion = result.value;
          this.citaService.editarCita(this.cita).subscribe(res => { console.log(res);
            if(res.status){
              Swal.fire(
                'Exito!',
                `La cita ha sido editada`,
                'success'
              );
              this.router.navigate(['cita'], { state: { persona: this.persona } } );
            }else{
              this.msg = 'No se ha podido crear la agenda';
              this.error = true;
              if(res.show){
                Swal.fire(
                  'Error!',
                  res.message,
                  'error'
                );
              }
            }
          });
        }
      }
    });
  }

}
