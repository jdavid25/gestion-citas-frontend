import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private urlEndPoint: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getAgenda(id: any): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/agenda/'+id);
  }

  crearAgenda(data: any): Observable<any>{
    return this.http.post<any>(this.urlEndPoint+'/agenda',data);
  }

  editarAgenda(data: any): Observable<any>{
    return this.http.put<any>(this.urlEndPoint+'/agenda',data);
  }

  eliminarAgenda(id: any): Observable<any>{
    return this.http.delete<any>(this.urlEndPoint+'/agenda/'+id);
  }

  getAgendaDisponible(data:any): Observable<any>{
    return this.http.post<any>(this.urlEndPoint+'/agenda/disponible',data);
  }
}
