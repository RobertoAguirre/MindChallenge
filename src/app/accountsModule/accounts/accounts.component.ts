import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  public dataset;
  public tableTitle = "Cuentas registradas ";
  public tableDescription = "descripcion desde home";
  public cardTitle;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.GetAccounts();
  }

  GoToDetails(createOrDetails) {
    this.router.navigate(['accounts-details'], { queryParams: { 'item': createOrDetails } }); // tells them they've been logged out (somehow)
  }

  TableRecordDetails(item) {
    item = JSON.stringify(item);
    this.router.navigate(['accounts-details'], { queryParams: { 'item': item } });
  }

  TableRecordDelete(item) {
    alert("logica para borrar item  " + item);
  }

  GetAccounts() {
    let data = {
      "appname": "MINDCHALLENGE",
      "sp": 'GetAllAccounts',
      "params": []
    }

    this.apiService.runSp(data).subscribe((response) => {
      let _response;
      _response = response;

      this.dataset = _response.success.recordset;
    })
  }

}
