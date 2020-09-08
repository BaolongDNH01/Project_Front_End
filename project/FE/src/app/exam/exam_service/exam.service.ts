import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Exam} from '../exam';


@Injectable({
  providedIn: 'root'
})
export class ExamService {
  URL = 'http://localhost:8080';
  listExam: Exam[];


  constructor(private httpClient: HttpClient) {
  }

  findNameUserPointDesc(): Observable<any> {
    return this.httpClient.get<any>(this.URL + '/get-user-point');
  }

  findById(examId: number): Observable<Exam> {
    return this.httpClient.get<Exam>(this.URL + '/get-exam/' + examId);
  }

  save(exam: Exam): Observable<Exam> {
    return this.httpClient.post<Exam>(this.URL + '/create-exam', Exam);
  }

}
