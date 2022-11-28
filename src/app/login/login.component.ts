import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  msg:string = "Credenciales incorrectas!";
  error: boolean = false;
  user:any;
  persona:any;

  constructor(private loginSerivce: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.required, Validators.email]),
      password : new FormControl('',[Validators.required])
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.loginSerivce.doLogin(this.loginForm.value).subscribe( res => {
        if(res){
          // localStorage.setItem('token',JSON.stringify(res.accessToken));
          // localStorage.setItem('user',JSON.stringify(res.user));
          this.user = localStorage.getItem('user');
          this.user = JSON.parse(this.user);
          this.persona = localStorage.getItem('persona');
          this.persona = JSON.parse(this.persona);
          if(this.user.perfil_id == 1){
            this.router.navigate(['/medico']);
            return;
          }
          this.router.navigate(['/cita'], {state: {persona: this.persona}});
        }else{
          this.error = true;
        }
      });
    }
  }

}
