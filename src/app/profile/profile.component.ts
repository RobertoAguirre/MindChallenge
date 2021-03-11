import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private createOrDetails;
  public showDelete;
  public cardTitle = "Perfil"
  public userId;
  public user;
  public actualLink;
  registerForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.userId = localStorage.getItem('id');

    this.showDelete = true;
    this.cardTitle = 'Perfil de usuario';
    this.registerForm = this.formBuilder.group({
      fullname: new FormControl('', [Validators.required, Validators.minLength(8)]),
      mail: new FormControl('', [Validators.required, Validators.minLength(7)]),
      englishLevel: new FormControl('', [Validators.required, Validators.minLength(2)]),
      techSkills: new FormControl([''], Validators.required),
      cvLink: new FormControl([''], Validators.required)
    })
    //first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),

    /*    this.route.queryParams.subscribe(params => {
         this.createOrDetails = params['item'];
         if (this.createOrDetails === 'new') {
   
           this.showDelete = false;
   
         } else {
           this.showDelete = true;
   
           let _item = JSON.parse(params['item']);
           let idAccount = _item.idAccount;
   
         }
       }); */

    this.GetProfile();

  }

  GetProfile() {


    let data = {
      "appname": "MINDCHALLENGE",
      "sp": 'GetProfile',
      "params": [this.userId]
    }
    this.apiService.runSp(data).subscribe((response) => {
      let _response;
      _response = response;
      if (_response.success.recordset.length >= 1) {
        this.user = _response.success.recordset[0];
        this.registerForm.setValue({
          fullname: this.user.fullname,
          mail: this.user.mail,
          englishLevel: this.user.englishLevel,
          techSkills: this.user.techSkills,
          cvLink: this.user.cvLink
        })

        this.actualLink = `${this.user.cvLink}`;

      } else {

      }
    })


  }

  Save() {
    this.Update();

  }

  Update() {
    let data = {
      "appname": "MINDCHALLENGE",
      "sp": 'UpdateProfile',
      "params": [`${this.user.idProfile},`,
      `'${this.registerForm.value.fullname}',`,
      `'${this.registerForm.value.mail}',`,
      `'${this.registerForm.value.englishLevel}',`,
      `'${this.registerForm.value.techSkills}',`,
      `'${this.registerForm.value.cvLink}'`]
    }
    this.apiService.runSp(data).subscribe((response) => {
      let _response;
      _response = response;
      if (_response.success.rowsAffected[0] >= 1) {
        //alert("Cambios guardados con éxito");
        Swal.fire('Éxito', 'Cambios guardados con éxito!', 'success');

        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['../profile'], { relativeTo: this.route });
        //this.router.navigate(['accounts']);
      } else {

      }
    })
  }

  get getControl() {
    return this.registerForm.controls;
  }



}
