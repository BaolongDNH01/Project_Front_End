import {Injectable} from "@angular/core";
import {Question} from './question';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Test} from "../test/test";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  question: Question;
  API_URL = 'http://localhost:8080';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getAllQuestion(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(this.API_URL + '/question');
  }

  findById(id: string): Observable<Question> {
    return this.httpClient.get<Question>(this.API_URL + '/question/' + id);
  }

  deleteProduct(id: number): Observable<Question> {
    return this.httpClient.delete<Question>(this.API_URL + '/delete-question/' + id);
  }
  saveQuestion(question: Question): Observable<any>{
    return this.httpClient.post<any>(this.API_URL + '/create-question', question);
  }

  getAllTest(): Observable<Test[]>{
    return this.httpClient.get<Test[]>(this.API_URL + '/getAllTest');
  }
}
