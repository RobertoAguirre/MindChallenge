import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-accounts-details',
  templateUrl: './accounts-details.component.html',
  styleUrls: ['./accounts-details.component.css']
})
export class AccountsDetailsComponent implements OnInit {

  private createOrDetails;
  public cardTitle;
  public account;
  public showDelete;
  /* 
    registerForm = new FormGroup({
      accountName: new FormControl(''),
      customerName: new FormControl(''),
      responsibleName: new FormControl(''),
      idTeam: new FormControl(1)
    })
   */
  registerForm = new FormGroup({})

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {

    /* this.registerForm = new FormGroup({
      accountName: new FormControl,
      customerName: new FormControl,
      responsibleName: new FormControl,
      idTeam: new FormControl
    }) */

    this.registerForm = this.formBuilder.group({
      accountName: ['', Validators.required],
      customerName: [''],
      responsibleName: [''],
      idTeam: [1]
    })


  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.createOrDetails = params['item'];
      if (this.createOrDetails === 'new') {
        this.cardTitle = 'Nueva cuenta';
        this.showDelete = false;
      } else {
        this.showDelete = true;
        this.cardTitle = 'Detalles de la cuenta';
        let _item = JSON.parse(params['item']);
        let idAccount = _item.idAccount;
        this.GetAccount(idAccount);
      }
    });
  }

  GetAccount(idAccount) {
    let data = {
      "appname": "MINDCHALLENGE",
      "sp": 'GetAccount',
      "params": [idAccount]
    }



    this.apiService.runSp(data).subscribe((response) => {
      let _response;
      _response = response;
      this.account = _response.success.recordset[0];
      this.registerForm.setValue({
        accountName: this.account.accountName,
        customerName: this.account.customerName,
        responsibleName: this.account.responsibleName,
        idTeam: this.account.idTeam
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
    let data = {
      "appname": "MINDCHALLENGE",
      "sp": 'UpdateAccount',
      "params": [`${this.account.idAccount},`,
      `'${this.registerForm.value.accountName}',`,
      `'${this.registerForm.value.customerName}',`,
      `'${this.registerForm.value.responsibleName}',`,
      `${this.registerForm.value.idTeam}`]
    }
    this.apiService.runSp(data).subscribe((response) => {
      let _response;
      _response = response;
      if (_response.success.rowsAffected[0] >= 1) {
        alert("Cambios guardados con éxito");
        this.router.navigate(['accounts']);
      } else {

      }
    })
  }

  Register() {
    let data = {
      "appname": "MINDCHALLENGE",
      "sp": 'SaveAccount',
      "params": [`'${this.registerForm.value.accountName}',`,
      `'${this.registerForm.value.customerName}',`,
      `'${this.registerForm.value.responsibleName}',`,
      `${this.registerForm.value.idTeam}`]
    }
    this.apiService.runSp(data).subscribe((response) => {
      let _response;
      _response = response;
      if (_response.success.idAccount != -1) {
        alert("Cuenta registrado exitosamente");
        this.router.navigate(['accounts']);
      } else {
        alert("La cuenta ya existe");
      }

    })
  }

  Delete() {
    let r = confirm('Esta a punto de borrar una cuenta, ¿Está seguro?');
    if (r === true) {

      let data = {
        "appname": "MINDCHALLENGE",
        "sp": 'DeleteAccount',
        "params": [this.account.idAccount]
      }

      this.apiService.runSp(data).subscribe((response) => {
        let _response;
        _response = response;
        if (_response.success.idAccount != -1) {
          this.registerForm.reset();
          alert("Usuario eliminado exitosamente");
          this.router.navigate(['accounts']);
        } else {
          alert("Error al eliminar el usuario");
        }
      })

    } else {

    }
  }

}
