import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlEndPoint: string = 'http://localhost:8000/api';

  private user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }
  
  get hasUser() {
    return this.user.asObservable();
  }

  doLogin(data:any): Observable<any>{
    return this.http.post<any>(this.urlEndPoint+'/login', data).pipe( map(res => {
      if(!res.status){
        return false;
      }
      localStorage.setItem('token',res.accessToken);
      localStorage.setItem('user',JSON.stringify(res.user));
      localStorage.setItem('persona',JSON.stringify(res.persona));
      this.user.next(res.user);
      return true;
    }));
  }

  doLogout(): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/logout').pipe( map( res => {
      if(res.status){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('persona');
        this.user.next(null);
        return true;
      }
      
      return false;
    }));
  }
}
