import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgendaService } from '../agenda.service';
import Swal from 'sweetalert2';
import { ConsultorioService } from 'src/app/consultorio/consultorio.service';

@Component({
  selector: 'app-form-agenda',
  templateUrl: './form-agenda.component.html',
  styleUrls: ['./form-agenda.component.css']
})
export class FormAgendaComponent implements OnInit {

  agendaForm!: FormGroup;
  error:boolean = false;
  msg:string = 'No se ha podido crear la agenda';
  labelBoton:string = 'Crear';
  consultorios:any[] = [];
  persona:any;

  constructor(private agendaSerivce: AgendaService,
              private consultorioService: ConsultorioService,
              private router: Router) {
    this.agendaForm = new FormGroup({
      id : new FormControl(''),
      consultorio_id : new FormControl('',[Validators.required]),
      fecha : new FormControl('',[Validators.required]),
      hora_inicio : new FormControl('',[Validators.required]),
      hora_fin : new FormControl('',[Validators.required]),
      persona_id : new FormControl('',[Validators.required])
    });
    
    if(this.router.getCurrentNavigation()?.extras?.state){
      this.persona = this.router.getCurrentNavigation()?.extras?.state?.['persona'];
      if(this.persona){
        this.agendaForm.get('persona_id')?.setValue(this.persona.id);
        this.consultorioService.getConsultoriosDepartamento(this.persona.id_departamento)
          .subscribe(res =>{console.log(res)
            if(!res.status){
              Swal.fire(
                'Error!',
                `No hay consultorios creados para el departamento al que pertenece este médico`,
                'error'
              );
              this.router.navigate(['/medico']);
            }else{
              this.consultorios = res.consultorios;
            }
          });
      }
      let agenda = this.router.getCurrentNavigation()?.extras?.state?.['agenda'];
      if(agenda){
        this.labelBoton = 'Editar';
        this.agendaForm.get('id')?.setValue(agenda.id);
        this.agendaForm.get('consultorio_id')?.setValue(agenda.consultorio_id);
        this.agendaForm.get('fecha')?.setValue(agenda.fecha);
        this.agendaForm.get('hora_inicio')?.setValue(agenda.hora);
        this.agendaForm.get('hora_fin')?.setValue(agenda.hora);
        this.agendaForm.get('hora_fin')?.disable();
      }
    }
  }

  ngOnInit(): void {
  }

  onRegresar(){
    this.router.navigate(['/agenda'],{state: {persona: this.persona}});
  }

  onAjustarHora(name:any, value:any){
    let arrayHora = this.agendaForm.get(name)?.value.split(':');
    let nuevaHora = arrayHora[0]+':00';
    this.agendaForm.get(name)?.setValue(nuevaHora);
  }

  onSetHoraFin(value:any){
    let arrayHora = value.split(':');
    let nuevaHora = (Number(arrayHora[0])+1)+':00';console.log(nuevaHora)
    nuevaHora = nuevaHora.length == 4 ? '0'+nuevaHora : nuevaHora;console.log(nuevaHora)
    this.agendaForm.get('hora_fin')?.setValue(nuevaHora);
  }

  onSubmit(){
    if(this.agendaForm.valid){
      if(this.agendaForm.value.id == ''){
        this.agendaSerivce.crearAgenda(this.agendaForm.value).subscribe( res => {
          if(res.status){
            Swal.fire(
              'Exito!',
              `Se ha creado ${res.cantidad} agenda(s) disponible(s)`,
              'success'
            );
            this.router.navigate(['/agenda'],{state: {persona: this.persona}});
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
        this.agendaSerivce.editarAgenda(this.agendaForm.value).subscribe( res => {
          if(res.status){
            Swal.fire(
              'Exito!',
              `Se ha editado la agenda`,
              'success'
            );
            this.router.navigate(['/agenda'],{state: {persona: this.persona}});
          }else{
            this.msg = 'No se ha podido editar la agenda';
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
      
    }else{
      this.msg = 'Por favor, ingrese datos válidos';
      this.error = true;
    }
  }
}
