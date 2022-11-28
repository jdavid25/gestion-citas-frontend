import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { ListPersonaComponent } from './persona/list-persona/list-persona.component';
import { ListConsultorioComponent } from './consultorio/list-consultorio/list-consultorio.component';
import { FormConsultorioComponent } from './consultorio/form-consultorio/form-consultorio.component';
import { FormPersonaComponent } from './persona/form-persona/form-persona.component';
import { ListAgendaComponent } from './agenda/list-agenda/list-agenda.component';
import { FormAgendaComponent } from './agenda/form-agenda/form-agenda.component';
import { ListCitaComponent } from './cita/list-cita/list-cita.component';
import { FormCitaComponent } from './cita/form-cita/form-cita.component';
import { FormDiagnosticoComponent } from './diagnostico/form-diagnostico/form-diagnostico.component';
import { ShowDiagnosticoComponent } from './diagnostico/show-diagnostico/show-diagnostico.component';
import { TokenService } from './interceptor/token.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ListPersonaComponent,
    ListConsultorioComponent,
    FormConsultorioComponent,
    FormPersonaComponent,
    ListAgendaComponent,
    FormAgendaComponent,
    ListCitaComponent,
    FormCitaComponent,
    FormDiagnosticoComponent,
    ShowDiagnosticoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
