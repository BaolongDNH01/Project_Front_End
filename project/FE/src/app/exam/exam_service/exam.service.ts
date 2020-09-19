import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Exam} from '../exam';


@Injectable({
  providedIn: 'root'
})
export class ExamService {
  URL = 'http://localhost:8080';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  findUserTopPositive(): Observable<any> {
    return this.httpClient.get<any>(this.URL + '/get-user-top-positive');
  }

  findById(examId: number): Observable<Exam> {
    return this.httpClient.get<Exam>(this.URL + '/get-exam/' + examId);
  }

  save(exam: Exam): Observable<Exam> {
    return this.httpClient.post<Exam>(this.URL + '/create-exam', exam);
  }

  findExamByUserName(username: string): Observable<any> {
    return this.httpClient.get<Exam>(`${this.URL}/history/${username}`);
  }
  findTopUserExamSubject(subjectId: number): Observable<any> {
    return this.httpClient.get<any>(this.URL + '/top-user-exam-subject/' + subjectId);
  }

}
