import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Subject} from '../subject';
import {Test} from '../test';
import {Message} from '../message';
import {JwtService} from '../../login/services/jwt.service';



@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpClient: HttpClient, private jwt: JwtService) {
  }

  private getAllTestApi = 'http://localhost:8080/getAllTest';
  private uploadFile = 'http://localhost:8080/importTest';
  private deleteTest = 'http://localhost:8080/deleteTest';
  private getAllSubjectApi = 'http://localhost:8080/getAllSubject';
  private addTestApi = 'http://localhost:8080/addTest';
  private URL = 'http://localhost:8080';


  getAllTest(): Observable<Test[]> {
    const headerAuth = new HttpHeaders();
    headerAuth.append('admin', 'Bearer' + this.jwt.getToken());
    return this.httpClient.get<Test[]>(this.getAllTestApi, {headers: headerAuth});
  }

  upload(file: File): Observable<Message> {
    const headerAuth = new HttpHeaders();
    headerAuth.append('admin', 'Bearer' + this.jwt.getToken());
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<Message>(this.uploadFile, formData, {headers: headerAuth});
  }

  deleteTests(list: number[]): Observable<any> {
    const headerAuth = new HttpHeaders();
    headerAuth.append('admin', 'Bearer' + this.jwt.getToken());
    return this.httpClient.post<any>(this.deleteTest, list, {headers: headerAuth});
  }

  getAllSubject(): Observable<Subject[]> {
    const headerAuth = new HttpHeaders();
    headerAuth.append('admin', 'Bearer' + this.jwt.getToken());
    return this.httpClient.get<Subject[]>(this.getAllSubjectApi, {headers: headerAuth});
  }

  addTest(test: Test): Observable<Message> {
    const headerAuth = new HttpHeaders();
    headerAuth.append('admin', 'Bearer' + this.jwt.getToken());
    return this.httpClient.post<Message>(this.addTestApi, test, {headers: headerAuth});
  }

  findById(testId: number): Observable<Test> {
    return this.httpClient.get<Test>(this.URL + '/getTestById/' + testId);
  }

}
