import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public dataset;
  public tableTitle = "Usuarios registrados ";
  public tableDescription = "descripcion desde home";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.GetUsers();

  }


  GoToDetails(createOrDetails) {
    this.router.navigate(['user-details'], { queryParams: { 'item': createOrDetails } }); // tells them they've been logged out (somehow)
  }

  TableRecordDetails(item) {
    item = JSON.stringify(item);
    this.router.navigate(['user-details'], { queryParams: { 'item': item } });
  }

  TableRecordDelete(item) {
    alert("logica para borrar item  " + item);
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

      this.dataset = _response.success.recordset;
    })

  }

}
