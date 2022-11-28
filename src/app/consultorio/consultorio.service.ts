import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultorioService {
  private urlEndPoint: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getConsultorios(): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/consultorio');
  }

  getConsultoriosDepartamento(id_departamento: any): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/consultorio/'+id_departamento);
  }

  getDepartamentos(): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/departamento');
  }

  getMunicipios(): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/municipio');
  }

  getMunicipiosPorDepartamento(id:any): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/municipio/departamento/'+id);
  }

  crearConsultorio(data: any): Observable<any>{
    return this.http.post<any>(this.urlEndPoint+'/consultorio',data);
  }

  editarConsultorio(data: any): Observable<any>{
    return this.http.put<any>(this.urlEndPoint+'/consultorio',data);
  }

  eliminarConsultorio(id: any): Observable<any>{
    return this.http.delete<any>(this.urlEndPoint+'/consultorio/'+id);
  }
}
