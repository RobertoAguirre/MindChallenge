import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  public dataset;
  public tableTitle = "Equipos registrados ";
  public tableDescription = "descripcion desde home";
  public teamName;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.GetTeams();
  }

  GoToDetails(createOrDetails) {
    this.router.navigate(['teams-details'], { queryParams: { 'item': createOrDetails } }); // tells them they've been logged out (somehow)
  }

  TableRecordDetails(item) {
    item = JSON.stringify(item);
    this.router.navigate(['teams-details'], { queryParams: { 'item': item } });
  }

  TableRecordDelete(item) {
    alert("logica para borrar item  " + item);
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

      this.dataset = _response.success.recordset;
    })

  }

}
