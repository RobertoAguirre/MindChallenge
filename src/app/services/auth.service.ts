import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Token;
  constructor() { }

  isLoggedIn(): boolean {

    if (this.Token !== undefined) {
      return true;
    } else {
      return false;
    }


  }

  setToken(tkn) {
    this.Token = tkn;
  }

  getToken() {
    return this.Token;
  }

  clearToken(){
    this.Token = "";
  }

}
