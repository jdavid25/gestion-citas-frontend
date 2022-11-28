import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private urlEndPoint: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getCitas(id_persona:any): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/cita/'+id_persona);
  }

  crearCita(data: any): Observable<any>{
    return this.http.post<any>(this.urlEndPoint+'/cita',data);
  }

  editarCita(data: any): Observable<any>{
    return this.http.put<any>(this.urlEndPoint+'/cita',data);
  }

  eliminarCita(id: any): Observable<any>{
    return this.http.delete<any>(this.urlEndPoint+'/cita/'+id);
  }

  cancelarCita(data: any): Observable<any>{
    return this.http.post<any>(this.urlEndPoint+'/cita/cancelar',data);
  }
}
