import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '../Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  URL = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }
  saveQuestion(question: Question): Observable<any>{
    return this.httpClient.post<any>(this.URL + '/create-question', question);
  }
  findAllQuestion(): Observable<Question[]>{
    return this.httpClient.get<Question[]>(this.URL + '/question');
  }
  findById(id: string): Observable<Question>{
    return this.httpClient.get<Question>(this.URL + '/question/' + id);
  }
}
