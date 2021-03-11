import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { getLocaleMonthNames } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';
//import { AppComponent } from '../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public valor = 0;
  public resultados;
  public token;
  public id;

  public loginForm;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router

  ) {

    

    this.loginForm = new FormGroup({
      usuario: new FormControl,
      pass: new FormControl
    })


  }

  ngOnInit(): void {

  }

  /*   GoRegister(){
      this.router.navigate(['home']); 
    } */

  Authenticate() {


    let data = {
      "appname": "MINDCHALLENGE",
      "params": {
        "userName": this.loginForm.email,
        "pass": this.loginForm.pass
      }
    }



    this.apiService.authenticate(data).subscribe((response) => {
      let _response;
      _response = response;
      localStorage.setItem('id', _response.id);

      if (_response.acceso !== true) {
        Swal.fire('Error', `${_response.message}`, 'error')
        //alert(_response.message);
      } else {
        this.token = _response.token;
        this.id = _response.id;
        localStorage.setItem('tkn', this.token);
        this.authService.setToken(this.token);
        let tkn = this.authService.getToken();
        //alert(tkn);


        let _data = {
          "appname": "MINDCHALLENGE",
          "sp": 'GetUser',
          "params": [this.id]
        }

        this.apiService.runSp(_data).subscribe((response) => {
          let _response;
          _response = response ;

          let user = _response.success.recordset[0];
          
          localStorage.setItem('role',user.role);

       
          localStorage.setItem('id', this.id);

          this.id = localStorage.getItem('id');
          //this.appComponent.GeneraMenu();
          this.router.navigate(['home']); // tells them they've been logged out (somehow)
        })

      }

    })

  }

}
