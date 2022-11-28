import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DiagnosticoService } from '../diagnostico.service';
import { PersonaService } from 'src/app/persona/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-diagnostico',
  templateUrl: './form-diagnostico.component.html',
  styleUrls: ['./form-diagnostico.component.css']
})
export class FormDiagnosticoComponent implements OnInit {

  diagnosticoForm!:FormGroup;
  error:boolean = false;
  msg:string = 'No se ha podido crear la agenda';
  labelBoton:string = 'Crear';
  paciente:any;
  medico:any;
  medicamentos:any;
  selectMedicamentos:any[] = [];

  constructor(private diagnosticoService: DiagnosticoService,
    private personaService: PersonaService,
    private router: Router) {
    this.diagnosticoForm = new FormGroup({
      id : new FormControl(''),
      descripcion : new FormControl('',[Validators.required]),
      cita_id : new FormControl('',[Validators.required]),
      detalle : new FormControl('')
    });
    
    if(this.router.getCurrentNavigation()?.extras?.state){
      this.medico = this.router.getCurrentNavigation()?.extras?.state?.['persona'];
      let cita = this.router.getCurrentNavigation()?.extras?.state?.['cita'];
      if(cita){
        this.diagnosticoForm.get('cita_id')?.setValue(cita.id);
        this.personaService.getPersona(cita.persona_id).subscribe(res =>{
          if(res.status){
            this.paciente = res.persona;
          }
        });
      }
    }
  }

  ngOnInit(): void {
    this.diagnosticoService.getMedicamentos().subscribe(res => {console.log(res)
      if(res.status){
        this.medicamentos = res.medicamentos;
      }
    })
  }
  
  onRegresar(){
    this.router.navigate(['/cita'],{state: {persona: this.medico}});
  }

  addMedicamento(ev:any){
    if(this.selectMedicamentos.includes(ev.value)){
      const index = this.selectMedicamentos.indexOf(ev.value);
      this.selectMedicamentos.splice(index, 1);
    }else{
      this.selectMedicamentos.push(ev.value);
    }
    console.log(this.selectMedicamentos);
  }

  onSubmit(){console.log(this.diagnosticoForm);
  
    if(this.diagnosticoForm.valid){
      if(this.diagnosticoForm.value.id == ''){
        let listMedicamentos: any[] = [];
        this.selectMedicamentos.forEach(el =>{
          const cant = (<HTMLInputElement>document.querySelector('#cantidad-'+el)).value;
          const des = (<HTMLInputElement>document.querySelector('#des-'+el)).value;
          if(cant == '' || cant == '0' || des == ''){
            Swal.fire(
              'Error!',
              `Por favor digite la cantidad y descripción de los medicamentos seleccionados!`,
              'error'
            );
            return;
          }
          listMedicamentos.push({
            id_medicamento: el,
            cantidad: cant,
            descripcion: des
          });
        })
        this.diagnosticoForm.get('detalle')?.setValue(listMedicamentos);
        this.diagnosticoService.crearDiagnostico(this.diagnosticoForm.value).subscribe( res => {
          if(res.status){
            Swal.fire(
              'Exito!',
              `Se ha creado el diagnostico`,
              'success'
            );
            this.router.navigate(['/cita'],{state: {persona: this.medico}});
          }else{
            this.msg = 'No se ha podido crear el diagnostico';
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
        this.diagnosticoService.editarDiagnostico(this.diagnosticoForm.value).subscribe( res => {
          if(res.status){
            Swal.fire(
              'Exito!',
              `Se ha editado el diagnostico`,
              'success'
            );
            this.router.navigate(['/cita'],{state: {persona: this.medico}});
          }else{
            this.msg = 'No se ha podido editar el diagnostico';
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
