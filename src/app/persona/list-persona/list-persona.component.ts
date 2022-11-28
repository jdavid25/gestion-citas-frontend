import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from '../persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-persona',
  templateUrl: './list-persona.component.html',
  styleUrls: ['./list-persona.component.css']
})
export class ListPersonaComponent implements OnInit {

  perfil:number = 0;
  titulo:string = 'Médico';
  personas:any[] = [];

  constructor(private personaService: PersonaService,
              private router: Router) { }

  ngOnInit(): void {
    this.perfil = this.router.url == '/medico' ? 2 : 3;
    this.titulo = this.router.url == '/medico' ? 'Médico' : 'Paciente';
    console.log(this.titulo);
    this.cargarPersonas(this.perfil);
  }

  
  cargarPersonas(perfil:number){
    this.personaService.getPersonas(perfil).subscribe(res =>{
      if(res.status){
        this.personas = res.personas;
      }
    });
  }

  onCrear():void{
    this.router.navigate([this.router.url+'/form']);
  }

  onEditar(persona: any):void{
    if(this.perfil == 2){
      this.router.navigate(['/medico/form'], { state: { persona: persona}});
    }else{
      this.router.navigate(['/paciente/form'], { state: { persona: persona}});
    }
    
  }

  onEliminar(persona:any):void{
    Swal.fire({
      title: `Está seguro de eliminar al ${this.titulo} "${persona.nombre} ${persona.apellido}" ?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.eliminarPersona(persona.id).subscribe(res => {
          if(res.status){
            Swal.fire(
              'Exito!',
              `El ${this.titulo} ${res.persona.nombre} ${res.persona.apellido} ha sido eliminado`,
              'success'
            );
            this.cargarPersonas(this.perfil);
          }else{
            Swal.fire(
              'Error!',
              `El ${this.titulo} ${res.persona.nombre} ${res.persona.apellido} no ha sido eliminado`,
              'error'
            );
          }
        });
      }
    });
  }

  onAgenda(persona:any){
    this.router.navigate(['/agenda'], { state: { persona: persona}});
  }

  onCita(persona:any){
    this.router.navigate(['/cita'], { state: { persona: persona}});
  }
}
