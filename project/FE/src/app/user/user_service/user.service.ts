import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {User} from '../user_model/User';
import {Observable} from 'rxjs';
import {Password} from '../update-password/password';
import {JwtService} from '../../login/services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  REGISTER_USER_API_URL = 'http://localhost:8080/register';
  API_URL = 'http://localhost:8080';

   private ACCESS_ADMIN_API = 'http://localhost:8080/admin';
   private ACCESS_MEMBER_API = 'http://localhost:8080/member';


  constructor(private httpClient: HttpClient, private jwt: JwtService) { }
  getTotalUser(): Observable<number>{
    return this.httpClient.get<number>(this.API_URL + '/getTotalUser');
  }


  saveNewUser(user: User): Observable<HttpResponse<any>> {
   return  this.httpClient.post <any>(this.REGISTER_USER_API_URL, user, { observe: 'response' });
  }
  findUserNew(): Observable<User>{
    return this.httpClient.get<User>(this.API_URL + '/new-user');
  }
  findAllUser(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.API_URL + '/allUser');
  }

  deleteUser(id: number): Observable<HttpResponse<any>> {
    // const headerAuth = new HttpHeaders();
    // headerAuth.append('Authorization',
    //   'Bearer ' + this.jwt.getToken());
    return this.httpClient.delete<any>(this.API_URL + '/delete-user/' + id, { observe: 'response' });
  }

  // THIEN UPDATE
  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.API_URL}/detail-user/${id}`);
  }

  changePassword(userId: number, password: Password): Observable<User> {
    return this.httpClient.patch<User>(
      `${this.API_URL}/update-password/${userId}`,
      password
    );
  }

  editUser(user: User): Observable<User> {
    return this.httpClient.patch<User>(`${this.API_URL}/${user.id}`, user);
  }

    accessAdminPage(): Observable<string> {
    return this.httpClient.get(this.ACCESS_ADMIN_API, { responseType: 'text' });
  }

    accessMemberPage(): Observable<string> {
    return this.httpClient.get(this.ACCESS_MEMBER_API, { responseType: 'text' });
  }
}
