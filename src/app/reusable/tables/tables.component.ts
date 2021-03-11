import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent {



  @Input() tituloTabla: string;
  @Input() descripcionTabla: string;
  @Input() dataset;
  @Input() metodoEditar;
  @Input() metodoEliminar;
  @Input() showDetalles;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {

    $(document).ready(function () {
      $.fn.dataTable.ext.errMode = 'none';  //ESTO ES PARA BORRAR EL WARNING DE CUANDO LAS TABLAS TIENEN DIFERENTES NUMEROS DE CABECEROS
      //Y COLUMNAS O CUANDO HAY PROBLEMAS PARA CARGAR LOS DATOS
      //ESTO LO USO SOLO AQUÍ PARA PODER CAMBIAR EL IDIOMA EN TABLAS DINÁMICAS    

      $('#mytable').DataTable({
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
    });

  }

}
