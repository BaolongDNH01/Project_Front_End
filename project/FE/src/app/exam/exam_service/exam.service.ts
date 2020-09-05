import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExamService {
  URL = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }
  findNameUserPointDesc(): Observable<any>{
    return this.httpClient.get<any>(this.URL + '/get-user-point');
  }
}
