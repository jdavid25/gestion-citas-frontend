import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private urlEndPoint: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getPersonas(tipo:any): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/persona/'+tipo);
  }

  getDepartamentos(): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/departamento');
  }

  getMunicipios(): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/municipio');
  }

  crearPersona(data: any): Observable<any>{
    return this.http.post<any>(this.urlEndPoint+'/registro',data);
  }

  editarPersona(data: any): Observable<any>{
    return this.http.put<any>(this.urlEndPoint+'/persona',data);
  }

  eliminarPersona(id: any): Observable<any>{
    return this.http.delete<any>(this.urlEndPoint+'/persona/'+id);
  }

  getPersona(id: any): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/persona/id/'+id);
  }
}
