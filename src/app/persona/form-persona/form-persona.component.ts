import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonaService } from '../persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-persona',
  templateUrl: './form-persona.component.html',
  styleUrls: ['./form-persona.component.css']
})
export class FormPersonaComponent implements OnInit {

  perfil:string = '';
  titulo:string = 'Médico';
  urlListado:string = 'medico';

  personaForm!: FormGroup;
  error:boolean = false;
  msg:string = '';
  departamentos:any[] = [];
  municipios:any[] = [];
  municipiosDepartamento:any[] = [];
  labelBoton:string = 'Crear';

  constructor(private personaService: PersonaService,
              private router: Router) {
    this.personaForm = new FormGroup({
      id : new FormControl(''),
      tipo_documento : new FormControl('',[Validators.required]),
      num_documento : new FormControl('',[Validators.required]),
      nombre : new FormControl('',[Validators.required]),
      apellido : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required,Validators.email]),
      direccion : new FormControl('',[Validators.required]),
      telefono : new FormControl('',[Validators.required]),
      perfil_id : new FormControl('',[Validators.required]),
      departamento_id : new FormControl('',[Validators.required]),
      municipio_id : new FormControl('',[Validators.required])
    });

    this.personaService.getDepartamentos().subscribe(res => {
      if(res.status){
        this.departamentos = res.departamentos;
      }
    });

    this.personaService.getMunicipios().subscribe(res => {
      if(res.status){
        this.municipios = res.municipios;
      }
    });

    if(this.router.getCurrentNavigation()?.extras?.state){
      this.labelBoton = 'Editar';
      let persona = this.router.getCurrentNavigation()?.extras?.state?.['persona'];
      // console.log(consultorio.municipio_id);
      this.personaForm.get('id')?.setValue(persona.id);
      this.personaForm.get('tipo_documento')?.setValue(persona.tipo_documento);
      this.personaForm.get('num_documento')?.setValue(persona.num_documento);
      this.personaForm.get('nombre')?.setValue(persona.nombre);
      this.personaForm.get('apellido')?.setValue(persona.apellido);
      this.personaForm.get('email')?.setValue(persona.email);
      this.personaForm.get('direccion')?.setValue(persona.direccion);
      this.personaForm.get('telefono')?.setValue(persona.telefono);
      this.personaForm.get('departamento_id')?.setValue(persona.id_departamento);
      this.personaForm.get('municipio_id')?.setValue(persona.municipio_id);

      this.personaForm.get('tipo_documento')?.disable();
      this.personaForm.get('num_documento')?.disable();
      this.personaForm.get('nombre')?.disable();
      this.personaForm.get('apellido')?.disable();
      this.personaForm.get('email')?.disable();
      this.personaForm.get('departamento_id')?.disable();
      this.personaForm.get('municipio_id')?.disable();
    }
  }

  ngOnInit(): void {
    this.perfil = this.router.url == '/medico/form' ? '2' : '3';
    this.urlListado = this.router.url == '/medico/form' ? 'medico' : 'paciente';
    this.titulo = this.router.url == '/medico/form' ? 'Médico' : 'Paciente';
    this.personaForm.get('perfil_id')?.setValue(this.perfil);
  }

  onRegresar(){
    this.router.navigate([this.urlListado]);
  }

  onCambioDepartamento(id_departamento: string){
    this.municipiosDepartamento = [];
    this.personaForm.get('municipio_id')?.setValue('');
    this.municipios.forEach(municipio => {
      if(municipio.departamento_id == id_departamento){
        this.municipiosDepartamento.push({
          id : municipio.id,
          nombre : municipio.nombre
        });
      }
    });
  }

  onSubmit(){
    if(this.personaForm.valid){
      if(this.personaForm.value.id == ''){
        this.personaService.crearPersona(this.personaForm.value).subscribe( res => {console.log(res)
          if(res.status){
            Swal.fire(
              'Exito!',
              `El ${this.titulo} ${res.persona.nombre} ${res.persona.apellido} ha sido creado`,
              'success'
            );
            this.router.navigate([this.urlListado]);
          }else{
            this.msg = 'No se ha podido crear el '+this.titulo;
            this.error = true;
          }
        });
      }else{
        this.personaService.editarPersona(this.personaForm.value).subscribe( res => {
          if(res.status){
            Swal.fire(
              'Exito!',
              `El ${this.titulo} ${res.persona.nombre} ${res.persona.apellido} ha sido editado`,
              'success'
            );
            this.router.navigate([this.urlListado]);
          }else{
            this.msg = 'No se ha podido editar el '+this.titulo;
            this.error = true;
          }
        });
      }
      
    }else{
      this.msg = 'Por favor, ingrese datos válidos';
      this.error = true;
    }
  }
}
