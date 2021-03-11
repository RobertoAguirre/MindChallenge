import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
  public teamsDataset = []
  public team;
  public selectedTeamId;
  public defaultTeam;
  registerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {




  }

  changeTeam(e){
    //alert(e.target.value);
    this.selectedTeamId = e.target.value;

  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      accountName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      customerName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      responsibleName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      idTeam: new FormControl([''],Validators.required)
    })



    this.route.queryParams.subscribe(params => {
      this.createOrDetails = params['item'];
      if (this.createOrDetails === 'new') {
        this.cardTitle = 'Nueva cuenta';
        this.showDelete = false;
        this.GetTeams();
      } else {
        this.showDelete = true;
        this.cardTitle = 'Detalles de la cuenta';
        let _item = JSON.parse(params['item']);
        let idAccount = _item.idAccount;
        this.GetTeams();
        this.GetAccount(idAccount);
      }
    });

 
  }

  get getControl(){
    return this.registerForm.controls;
  }

  GetTeams() {

    //BuscaUsuario 'admin2','p4ss'

    let data = {
      "appname": "MINDCHALLENGE",
      "sp": 'GetTeams',
      "params": []
    }

    this.apiService.runSp(data).subscribe((response) => {
      let _response;
      _response = response;

      this.teamsDataset = _response.success.recordset;
    })

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

      //this.defaultTeam = this.teamsDataset.filter(item => item.idTeams === this.account.idTeam);
      //let existe = this.teamsDataset.indexOf(this.defaultTeam[0]);
      //alert(existe);
      //this.registerForm.controls['idTeam'].setValue(this.defaultTeam[0].teamName,{onlySelf:true});

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
      `${this.selectedTeamId}`]
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
      `${this.selectedTeamId}`]
    }
    this.apiService.runSp(data).subscribe((response) => {
      let _response;
      _response = response;
      if (_response.success.recordset[0].idAccount === null) {  //_response.success.idAccount !== -1
         alert("La cuenta ya existe");
        
      } else if( _response.success.recordset[0].idAccount !== -1 && _response.success.recordset[0].idAccount) { //_response.success.idAccount === null
       alert("Cuenta registrado exitosamente");
       this.router.navigate(['accounts']);
      }else{
        alert("error al guardar datos");
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
