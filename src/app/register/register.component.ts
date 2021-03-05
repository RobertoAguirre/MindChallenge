import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  /*   public valor = 0;
    public resultados;
    public token;
    public id; */

  registerForm = this.formBuilder.group({
    userName: ['', Validators.required],
    mail: ['', Validators.required],
    pass: ['', Validators.required],
    confirmPass: ['', Validators.required]
  })

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder

  ) {

    this.registerForm = new FormGroup({
      userName: new FormControl,
      mail: new FormControl,
      pass: new FormControl,
      confirmPass: new FormControl
    })


  }

  ngOnInit(): void {

  }

  Register() {

    if (this.registerForm.value.pass === this.registerForm.value.confirmPass) {
      let data = {
        "appname": "MINDCHALLENGE",
        "params": {
          "userName": this.registerForm.value.userName,
          "mail": this.registerForm.value.mail,
          "pass": this.registerForm.value.pass
        }
      }



      this.apiService.register(data).subscribe((response) => {
        let _response;
        _response = response;
        if (_response.success.idUser != -1) {
          localStorage.setItem('id', _response.success.idUser);
          alert("Usuario registrado exitosamente");
          this.router.navigate(['login']);
        } else {
          alert("el usuario ya existe");
        }

      })
    } else {

      alert("Las contraseñas no coinciden, intente de nuevo");

    }




  }

}
