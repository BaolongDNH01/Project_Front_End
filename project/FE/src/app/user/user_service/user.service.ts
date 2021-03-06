import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {User} from '../user_model/User';
import {Observable} from 'rxjs';
import {Password} from '../update-password/password';
import {JwtService} from '../../login/services/jwt.service';
import {Exam} from '../../exam/exam';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private REGISTER_USER_API_URL = 'http://localhost:8080/register';
  private API_URL = 'http://localhost:8080';

  private ACCESS_ADMIN_API = 'http://localhost:8080/admin';
  private ACCESS_MEMBER_API = 'http://localhost:8080/member';


  constructor(private httpClient: HttpClient, private jwt: JwtService) {
  }

  getTotalUser(): Observable<number> {
    return this.httpClient.get<number>(this.API_URL + '/getTotalUser');
  }


  saveNewUser(user: User): Observable<HttpResponse<any>> {
    return this.httpClient.post <any>(this.REGISTER_USER_API_URL, user, {observe: 'response'});
  }

  findUserNew(): Observable<User> {
    return this.httpClient.get<User>(this.API_URL + '/new-user');
  }

  findAllUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.API_URL + '/listUser');
  }

  deleteUser(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete<any>(this.API_URL + '/delete-user/' + id, {observe: 'response'});
  }


  getUserByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(`${this.API_URL}/getUserByUsername/${username}`);
  }

  changePassword(userId: number, password: Password): Observable<User> {
    return this.httpClient.patch<User>(
      `${this.API_URL}/update-password/${userId}`,
      password
    );
  }

  editUser(user: User): Observable<HttpResponse<any>> {
    return this.httpClient.patch<HttpResponse<any>>(this.API_URL + '/update-user/' + user.id, user, {observe: 'response'});
  }

  accessAdminPage(): Observable<string> {
    return this.httpClient.get(this.ACCESS_ADMIN_API, {responseType: 'text'});
  }

  accessMemberPage(): Observable<string> {
    return this.httpClient.get(this.ACCESS_MEMBER_API, {responseType: 'text'});
  }

  adminEditUser(user: User): Observable<HttpResponse<any>> {
    return this.httpClient.patch<HttpResponse<any>>(this.API_URL + '/edit-user', user, {observe: 'response'});
  }

  getTotalTime(user: User) {
    let exam: Exam;
    let totalTime = 0;
    for (exam of user.examList) {
      totalTime += exam.times;
    }
    return totalTime;
  }

  getTotalPoint(user: User) {
    let exam: Exam;
    let totalPoint = 0;
    for (exam of user.examList) {
      totalPoint += exam.mark;
    }
    return totalPoint;
  }

  getAverage(user: User) {
    let avg = 0;
    const total = this.getTotalPoint(user);
    avg = total / user.examList.length;
    return avg;
  }
}
