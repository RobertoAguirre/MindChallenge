import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public users;
  constructor(private apiService: ApiService,   private router: Router) { }

  ngOnInit(): void {
    //this.GetUsers();
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

      if(_response.mensaje ==='Token inválida'||_response.mensaje==="Token no proveída."){
        this.router.navigate(['login']);
      }else{
        this.users = _response.success.recordset;
      }

      
    })

  }

}
