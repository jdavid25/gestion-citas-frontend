import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/persona/persona.service';
import Swal from 'sweetalert2';
import { CitaService } from '../cita.service';

@Component({
  selector: 'app-list-cita',
  templateUrl: './list-cita.component.html',
  styleUrls: ['./list-cita.component.css']
})
export class ListCitaComponent implements OnInit {

  persona:any;
  user:any;
  citas:any[] = [];
  tipoPersona:string = 'Paciente';
  tipoPersonaTabla:string = 'Médico';

  constructor(private citaService: CitaService,
              private personaService: PersonaService,
              private router: Router) {
    
    this.user = localStorage.getItem('user');
    this.user = this.user ? JSON.parse(this.user) : null;
    this.tipoPersonaTabla = this.user.perfil_id == 2 ? 'Paciente' : 'Médico';
    this.tipoPersona = this.user.perfil_id == 2 ? 'Médico' : 'Paciente';
    
    if(this.router.getCurrentNavigation()?.extras?.state){
      this.persona = this.router.getCurrentNavigation()?.extras?.state?.['persona'];
      
    }
  }

  ngOnInit(): void {
    this.cargarCitas(this.persona.id);
  }

  onRegresar(){
    this.router.navigate(['/paciente']);
  }

  cargarCitas(id_persona:any){
    this.citaService.getCitas(id_persona).subscribe(res =>{
      if(res.status){
        this.citas = res.citas;
      }
    });
  }

  onCrear():void{
    this.router.navigate(['cita/form'],{ state: { persona: this.persona } });
  }

  onEditar(cita:any):void{
    this.router.navigate(['cita/form'], { state: { cita: cita, persona: this.persona}} );
  }

  onAtender(cita:any):void{
    this.router.navigate(['diagnostico/form'], { state: { cita: cita, persona: this.persona}} );
  }

  onVerDiagnostico(cita:any):void{
    this.router.navigate(['diagnostico/show'], { state: { cita: cita, persona: this.persona}} );
  }

  onEliminar(cita:any):void{
    Swal.fire({
      title: `Está seguro de eliminar la cita?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.citaService.eliminarCita(cita.id).subscribe(res => {
          if(res.status){
            Swal.fire(
              'Exito!',
              `La cita ha sido eliminado`,
              'success'
            );
            this.cargarCitas(this.persona.id);
          }else{
            Swal.fire(
              'Error!',
              `La cita no ha sido eliminado`,
              'error'
            );
          }
        });
      }
    });
  }

  onCancelar(cita:any){
    Swal.fire({
      title: 'Justificación de cancelación',
      input: 'textarea',
      showCancelButton: true,
      confirmButtonText: 'Reservar',
      showLoaderOnConfirm: true,
      preConfirm: (descripcion) => {
        if(descripcion == ""){
          Swal.showValidationMessage('La justificación es requerida!')
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        cita.descripcion = result.value;
        this.citaService.cancelarCita(cita).subscribe(res => {
          if(res.status){
            Swal.fire(
              'Exito!',
              `La cita ha sido cancelada`,
              'success'
            );
            this.cargarCitas(this.persona.id);
          }else{
            Swal.fire(
              'Error!',
              `La cita no ha sido cancelada`,
              'error'
            );
          }
        });
      }
    });
  }

}
