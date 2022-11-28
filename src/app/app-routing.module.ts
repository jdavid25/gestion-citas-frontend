import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAgendaComponent } from './agenda/form-agenda/form-agenda.component';
import { ListAgendaComponent } from './agenda/list-agenda/list-agenda.component';
import { FormCitaComponent } from './cita/form-cita/form-cita.component';
import { ListCitaComponent } from './cita/list-cita/list-cita.component';
import { FormConsultorioComponent } from './consultorio/form-consultorio/form-consultorio.component';
import { ListConsultorioComponent } from './consultorio/list-consultorio/list-consultorio.component';
import { FormDiagnosticoComponent } from './diagnostico/form-diagnostico/form-diagnostico.component';
import { ShowDiagnosticoComponent } from './diagnostico/show-diagnostico/show-diagnostico.component';

import { LoginComponent } from './login/login.component';
import { FormPersonaComponent } from './persona/form-persona/form-persona.component';
import { ListPersonaComponent } from './persona/list-persona/list-persona.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'medico', component: ListPersonaComponent},
  {path: 'medico/form', component: FormPersonaComponent},
  {path: 'paciente', component: ListPersonaComponent},
  {path: 'paciente/form', component: FormPersonaComponent},
  {path: 'consultorio', component: ListConsultorioComponent},
  {path: 'consultorio/form', component: FormConsultorioComponent},
  {path: 'agenda', component: ListAgendaComponent},
  {path: 'agenda/form', component: FormAgendaComponent},
  {path: 'cita', component: ListCitaComponent},
  {path: 'cita/form', component: FormCitaComponent},
  {path: 'diagnostico/form', component: FormDiagnosticoComponent},
  {path: 'diagnostico/show', component: ShowDiagnosticoComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
