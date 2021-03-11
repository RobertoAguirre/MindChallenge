import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-teams-movements',
  templateUrl: './teams-movements.component.html',
  styleUrls: ['./teams-movements.component.css']
})
export class TeamsMovementsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  public table: any = $('#table2');
  registerForm: FormGroup;

public dataset;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public apiService: ApiService,
    public formBuilder: FormBuilder
  ) { 
/*     $(document).ready(function () {
      $.fn.dataTable.ext.errMode = 'none';   

      $('#table2').DataTable({
        //paging:false,
        order: [],
        "language": {
          "processing": "Cargando ...",
          "search": "Buscar:",
          "lengthMenu": "Mostrando _MENU_ registros por página",
          "zeroRecords": "No se encontraron registros",
          "info": "Mostrando página _PAGE_ de _PAGES_",
          "infoEmpty": "No hay registros disponibles",
          "infoFiltered": "(fitrados de un total de  _MAX_ registros)",
          "paginate": {
            first: "Primero",
            previous: "Anterior",
            next: "Siguiente",
            last: "Último"
          },
        }
      });
    }); */
  }


  ngOnInit(): void {


    this.registerForm = this.formBuilder.group({
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required])
    })


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      order:[],
      language:{
        "processing": "Cargando ...",
        "search": "Buscar:",
        "lengthMenu": "Mostrando _MENU_ registros por página",
        "zeroRecords": "No se encontraron registros",
        "info": "Mostrando página _PAGE_ de _PAGES_",
        "infoEmpty": "No hay registros disponibles",
        "infoFiltered": "(fitrados de un total de  _MAX_ registros)",
        "paginate": {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        }
      }
    };
    this.GetTeams();


  
  }

  GetMovementsByDate(){

    
    let data = {
      "appname": "MINDCHALLENGE",
      "sp": 'GetMovementsByDate',
      "params": [`'${this.registerForm.value.startDate}',`,`'${this.registerForm.value.endDate} 23:59:59'`]
    }

    this.apiService.runSp(data).subscribe((response) => {
      let _response;
      _response = response;

      this.dataset = _response.success.recordset;
    })


  }

  GoToDetails(createOrDetails) {
    //this.router.navigate(['teams-details'], { queryParams: { 'item': createOrDetails } }); // tells them they've been logged out (somehow)
  }

  TableRecordDetails(item) {
    //item = JSON.stringify(item);
    //this.router.navigate(['teams-details'], { queryParams: { 'item': item } });
  }

  TableRecordDelete(item) {
   // alert("logica para borrar item  " + item);
  }

  GetTeams() {

    //BuscaUsuario 'admin2','p4ss'

    let data = {
      "appname": "MINDCHALLENGE",
      "sp": 'GetMovements',
      "params": []
    }

    this.apiService.runSp(data).subscribe((response) => {
      let _response;
      _response = response;

      this.dataset = _response.success.recordset;
    })

  }

}
