import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-teams-details',
  templateUrl: './teams-details.component.html',
  styleUrls: ['./teams-details.component.css']
})
export class TeamsDetailsComponent implements OnInit {
  private createOrDetails;
  public cardTitle;
  public team;
  public showDelete;
  public users = [];
  public teamMembers = [];

  registerForm = this.formBuilder.group({
    teamName: ['', Validators.required]
  })

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {
    this.registerForm = new FormGroup({
      teamName: new FormControl
    })
  }





  ngOnInit(): void {
    this.GetUsers();
    this.route.queryParams.subscribe(params => {
      this.createOrDetails = params['item'];
      if (this.createOrDetails === 'new') {
        this.cardTitle = 'Nuevo equipo';
        this.showDelete = false;
      } else {
        this.showDelete = true;
        this.cardTitle = 'Detalles de la equipo';
        let _item = JSON.parse(params['item']);
        let idTeams = _item.idTeams;
        this.GetTeam(idTeams);
      }
    });
  }

  PassToTeam(item) {
    this.teamMembers.push(item);
  }

  KickFromTeam(value) {
    //arr = arr.filter(item => item !== value)
    this.teamMembers = this.teamMembers.filter(item => item !== value)
    //this.teamMembers.splice(item);
  }

  GetUsers() {

    //BuscaUsuario 'admin2','p4ss'

    let data = {
      "appname": "MINDCHALLENGE",
      "sp": 'GetAllUsers',
      "params": []
    }

    this.apiService.runSp(data).subscribe((response) => {
      let _response;
      _response = response;

      this.users = _response.success.recordset;
    })

  }

  GetTeam(idTeams) {
    let data = {
      "appname": "MINDCHALLENGE",
      "sp": 'GetTeam',
      "params": [idTeams]
    }



    this.apiService.runSp(data).subscribe((response) => {
      let _response;
      _response = response;
      this.team = _response.success.recordset[0];
      this.registerForm.setValue({
        teamName: this.team.teamName
      })
      this.teamMembers = JSON.parse(this.team.teamMembers);

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

    let _teamMembers = JSON.stringify(this.teamMembers);

    let data = {
      "appname": "MINDCHALLENGE",
      "sp": 'UpdateTeam',
      "params": [`${this.team.idTeams},`,
      `'${this.registerForm.value.teamName}',`, `'${_teamMembers}'`]
    }
    this.apiService.runSp(data).subscribe((response) => {
      let _response;
      _response = response;
      if (_response.success.rowsAffected[0] >= 1) {
        alert("Cambios guardados con éxito");
        this.router.navigate(['teams']);
      } else {

      }

    })
  }

  Register() {

    let _teamMembers = JSON.stringify(this.teamMembers);

    let data = {
      "appname": "MINDCHALLENGE",
      "sp": 'SaveTeam',
      "params": [`'${this.registerForm.value.teamName}',`, `'${_teamMembers}'`]
    }
    this.apiService.runSp(data).subscribe((response) => {
      let _response;
      _response = response;
      if (_response.success.idTeams != -1) {
        alert("Equipo registrado exitosamente");
        this.router.navigate(['teams']);
      } else {
        alert("El equipo ya existe");
      }

    })
  }

  Delete() {
    let r = confirm('Esta a punto de borrar una cuenta, ¿Está seguro?');
    if (r === true) {

      let data = {
        "appname": "MINDCHALLENGE",
        "sp": 'DeleteTeam',
        "params": [this.team.idTeams]
      }

      this.apiService.runSp(data).subscribe((response) => {
        let _response;
        _response = response;
        if (_response.success.idAccount != -1) {
          this.registerForm.reset();
          alert("Equipo eliminado exitosamente");
          this.router.navigate(['teams']);
        } else {
          alert("Error al eliminar el equipo");
        }
      })

    } else {

    }
  }


}
