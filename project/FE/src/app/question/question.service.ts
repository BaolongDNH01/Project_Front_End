import {Injectable} from '@angular/core';
import {Question} from './question';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  question: Question;
  API_URL = 'http://localhost:8080/question';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getAllQuestion(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(this.API_URL);
  }
}