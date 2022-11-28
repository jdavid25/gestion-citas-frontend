import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {
  private urlEndPoint: string = 'http://localhost:8000/api';

  // private httpHeaders = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json',
  //   'Authorization': "Bearer " + localStorage.getItem('token')
  // });
  // ,{headers: this.httpHeaders}

  constructor(private http: HttpClient) { }

  getDiagnostico(id_cita:any): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/diagnostico/'+id_cita);
  }

  crearDiagnostico(data: any): Observable<any>{
    return this.http.post<any>(this.urlEndPoint+'/diagnostico',data);
  }

  editarDiagnostico(data: any): Observable<any>{
    return this.http.put<any>(this.urlEndPoint+'/diagnostico',data);
  }

  eliminarDiagnostico(id: any): Observable<any>{
    return this.http.delete<any>(this.urlEndPoint+'/diagnostico/'+id);
  }
  
  getMedicamentos(): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/medicamento');
  }
}
