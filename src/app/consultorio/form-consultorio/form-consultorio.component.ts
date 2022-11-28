import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsultorioService } from '../consultorio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-consultorio',
  templateUrl: './form-consultorio.component.html',
  styleUrls: ['./form-consultorio.component.css']
})
export class FormConsultorioComponent implements OnInit {

  consultorioForm!: FormGroup;
  error:boolean = false;
  msg:string = 'No se ha podido crear el consultorio';
  departamentos:any[] = [];
  municipios:any[] = [];
  municipiosDepartamento:any[] = [];
  labelBoton:string = 'Crear';

  constructor(private consultorioService: ConsultorioService, private router: Router) {
    this.consultorioForm = new FormGroup({
      id : new FormControl(''),
      nombre : new FormControl('',[Validators.required]),
      direccion : new FormControl('',[Validators.required]),
      departamento_id : new FormControl('',[Validators.required]),
      municipio_id : new FormControl('',[Validators.required])
    });
    
    this.consultorioService.getDepartamentos().subscribe(res => {
      if(res.status){
        this.departamentos = res.departamentos;
      }
    });

    this.consultorioService.getMunicipios().subscribe(res => {
      if(res.status){
        this.municipios = res.municipios;
      }
    });

    if(this.router.getCurrentNavigation()?.extras?.state){
      this.labelBoton = 'Editar';
      let consultorio = this.router.getCurrentNavigation()?.extras?.state?.['consultorio'];
      // console.log(consultorio.municipio_id);
      this.consultorioForm.get('id')?.setValue(consultorio.id);
      this.consultorioForm.get('nombre')?.setValue(consultorio.nombre);
      this.consultorioForm.get('direccion')?.setValue(consultorio.direccion);
      this.consultorioForm.get('departamento_id')?.setValue(consultorio.id_departamento);
      this.consultorioForm.get('municipio_id')?.setValue(consultorio.municipio_id);
    }
   }

  ngOnInit(): void {}

  onRegresar(){
    this.router.navigate(['consultorio']);
  }
  onCambioDepartamento(id_departamento: string){
    this.municipiosDepartamento = [];
    this.consultorioForm.get('municipio_id')?.setValue('');
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
    if(this.consultorioForm.valid){
      if(this.consultorioForm.value.id == ''){
        this.consultorioService.crearConsultorio(this.consultorioForm.value).subscribe( res => {
          if(res.status){
            Swal.fire(
              'Exito!',
              `El consultorio ${res.consultorio.nombre} ha sido creado`,
              'success'
            );
            this.router.navigate(['/consultorio']);
          }else{
            this.msg = 'No se ha podido crear el consultorio';
            this.error = true;
          }
        });
      }else{
        this.consultorioService.editarConsultorio(this.consultorioForm.value).subscribe( res => {
          if(res.status){
            Swal.fire(
              'Exito!',
              `El consultorio ${res.consultorio.nombre} ha sido editado`,
              'success'
            );
            this.router.navigate(['/consultorio']);
          }else{
            this.msg = 'No se ha podido crear el consultorio';
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
