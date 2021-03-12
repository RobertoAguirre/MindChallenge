import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Token;
  constructor() { }

  isLoggedIn(): boolean {
    this.Token = localStorage.getItem('tkn');
    if (this.Token !== undefined && this.Token !== null) {
      return true;
    } else {
      return false;
    }


  }

  setToken(tkn) {
    tkn = tkn = localStorage.getItem('tkn');
    this.Token = tkn;
  }

  getToken() {
    this.Token = localStorage.getItem('tkn');
    return this.Token;
  }

  clearToken(){
     localStorage.setItem('tkn', '');
   // this.Token = "";
   //alert("paes por clear");
  }

}
