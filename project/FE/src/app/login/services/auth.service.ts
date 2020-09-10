import { LoginInfo } from './../models/login-info';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { JwtResponse } from '../models/jwt-response';
import {JwtService} from "./jwt.service";
import {User} from "../../user/user_model/User";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_LOGIN_API = 'http://localhost:8080/login';

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  user$: Observable<User> = this.userSubject.asObservable();

  constructor(private http: HttpClient,
              private jwtService: JwtService) { }

  authLogin(loginInfo: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.AUTH_LOGIN_API, loginInfo, httpOptions);
  }

  getCurrentUser(): void {
    if (this.jwtService.getToken()) {
      this.http.get<User>(this.AUTH_LOGIN_API + 'me', httpOptions).subscribe((user) => {
        if (user) {
          this.userSubject.next(user);
        }
      });
    } else {
      this.userSubject.next(null);
    }
  }
}
