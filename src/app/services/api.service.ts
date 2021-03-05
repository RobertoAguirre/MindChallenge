import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  homeUrl = 'http://localhost:40000/'
  serviceUrl = 'http://localhost:40000/api/';
  //serviceUrl = 'http://localhost:40000/api/';
  constructor(
    private http: HttpClient
  ) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  }



  public pruebaGet() {
    try {
      return this.http.get(this.serviceUrl + 'pruebaget');
    } catch (ex) {
      console.log(ex);
    }

  }



  public runSp(data) {
    return this.http.post(this.serviceUrl + 'runsp/', data);
  }

  //trae token
  public authenticate(data) {

    return this.http.post(this.serviceUrl + 'Authenticate/', data);

  }

  //Alta Usuario
  public register(data) {

    return this.http.post(this.serviceUrl + 'Register/', data);

  }

  public updateUser(data) {

    return this.http.post(this.serviceUrl + 'updateuser/', data);

  }

  //subir archivos
  public uploadPhoto(formData) {

    return this.http.post(this.serviceUrl + 'UploadFiles/', formData);
  }



}
