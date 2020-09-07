import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Test} from '../test';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TestService {
  URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  findById(testId: number): Observable<Test> {
    return this.httpClient.get<Test>(this.URL + '/get-test/' + testId);
  }

}
