import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  private createOrDetails;
  public cardTitle;
  public user;
  public showDelete;


  registerForm = this.formBuilder.group({
    userName: ['', Validators.required],
    mail: ['', Validators.required],
    pass: ['', Validators.required],
    confirmPass: ['', Validators.required]
  })


  constructor(
    private route: ActivatedRoute,
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
    this.route.queryParams.subscribe(params => {
      this.createOrDetails = params['item'];
      if (this.createOrDetails === 'new') {
        this.cardTitle = 'Nuevo usuario';
        this.showDelete = false;
      } else {
        this.showDelete = true;
        this.cardTitle = 'Detalles de usuario';
        let _item = JSON.parse(params['item']);
        let idUser = _item.idUser;
        this.GetUser(idUser);
      }
    });
  }

  GetUser(idUser) {
    let data = {
      "appname": "MINDCHALLENGE",
      "sp": 'GetUser',
      "params": [idUser]
    }



    this.apiService.runSp(data).subscribe((response) => {
      let _response;
      _response = response;
      this.user = _response.success.recordset[0];
      this.registerForm.setValue({
        userName: this.user.userName,
        mail: this.user.mail,
        pass: "",
        confirmPass: ""
      })

    })
  }

  Save() {
    if (this.createOrDetails === 'new') {
      this.Register();
    } else {
      this.Update();
    }
  }

  Update() {

    if (this.registerForm.value.pass === this.registerForm.value.confirmPass) {
      let data = {
        "appname": "MINDCHALLENGE",
        "params": {
          "idUser": this.user.idUser,
          "userName": this.registerForm.value.userName,
          "mail": this.registerForm.value.mail,
          "pass": this.registerForm.value.pass
        }
      }



      this.apiService.updateUser(data).subscribe((response) => {
        let _response;
        _response = response;
        if (_response.success >= 1) {
          localStorage.setItem('id', _response.success.idUser);
          alert("Usuario modificado exitosamente");
          this.router.navigate(['users']);
        } else {
          alert("Error al modificar usuario");
        }

      })
    } else {

      alert("Las contraseñas no coinciden, intente de nuevo");

    }

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
          this.router.navigate(['users']);
        } else {
          alert("el usuario ya existe");
        }

      })
    } else {

      alert("Las contraseñas no coinciden, intente de nuevo");

    }

  }

  Delete() {

    let r = confirm('Esta a punto de borrar un usuario,¿Está seguro?');
    if (r === true) {

      let data = {
        "appname": "MINDCHALLENGE",
        "sp": 'DeleteUser',
        "params": [this.user.idUser]
      }

      this.apiService.runSp(data).subscribe((response) => {
        let _response;
        _response = response;
        if (_response.success.idUser != -1) {
          this.registerForm.setValue({
            userName: this.user.userName,
            mail: this.user.mail,
            pass: "",
            confirmPass: ""
          })
          alert("Usuario eliminado exitosamente");
          this.router.navigate(['users']);
        } else {
          alert("Error al eliminar el usuario");
        }



      })

    } else {

    }



  }

}
