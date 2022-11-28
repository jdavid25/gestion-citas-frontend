import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  user:any = null;

  constructor(private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginService.hasUser.subscribe(value => {
      this.user = value;
    });
  }

  onLogout(){
    this.loginService.doLogout().subscribe(res =>{
      if(res){
        this.router.navigate(['login']);
      }
    })
  }

}
