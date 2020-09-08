import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {User} from '../user_model/User';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  REGISTER_USER_API_URL = 'http://localhost:8080/register';
  API_URL = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }

  saveNewUser(user: User): Observable<HttpResponse<User>> {
   return  this.httpClient.post <User>(this.REGISTER_USER_API_URL, user, { observe: 'response' });
  }
  findUserNew(): Observable<User>{
    return this.httpClient.get<User>(this.API_URL + '/new-user');
  }
  findAllUser(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.API_URL + '/listUser');
  }
}
