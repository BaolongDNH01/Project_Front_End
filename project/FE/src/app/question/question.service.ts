import {Injectable} from '@angular/core';
import {Question} from './question';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Test} from '../test/test';
import {QuestionInExam} from './question-in-exam';
import {Subject} from "./subject";
import {JwtResponse} from '../login/models/jwt-response';
import {JwtService} from '../login/services/jwt.service';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  question: Question;
  API_URL = 'http://localhost:8080';
  uploadFile = 'http://localhost:8080/importQuestion';

  constructor(
    private httpClient: HttpClient,
    private jwt: JwtService
  ) {
  }

  getQuestionAllToTest(idTest: number, idSubject: number): Observable<Question[]> {
    let ids: number[] = [];
    ids.push(idTest);
    ids.push(idSubject)
    return this.httpClient.get<Question[]>(this.API_URL + '/getQuestionsToAddToTest/' + ids)
  }

  getAllQuestion(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(this.API_URL + '/question');
  }

  getAllQuestionInExam(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(this.API_URL + '/question-in-exam');
  }


  findById(id: string): Observable<Question> {
    return this.httpClient.get<Question>(this.API_URL + '/question/' + id);
  }

  deleteQuestion(id: string): Observable<Question> {
    return this.httpClient.delete<Question>(this.API_URL + '/delete-question/' + id);
  }

  deleteQuestionInExam(id: number, quesIds: string[]): Observable<any> {
    quesIds.push(id.toString());
    return this.httpClient.post<any>(this.API_URL + '/removeQuestionInTest/', quesIds);
  }

  addQuestionInExam(id: number, quesIds: string[]): Observable<any> {
    quesIds.push(id.toString());
    return this.httpClient.post<any>(this.API_URL + '/addQuestionInTest/', quesIds);
  }

  saveQuestion(question: Question): Observable<any> {
    const headerAuth = new HttpHeaders();
    headerAuth.append('admin', 'Bearer' + this.jwt.getToken());
    return this.httpClient.post<any>(this.API_URL + '/add-question', question, {headers: headerAuth});
  }

  saveQuestionInExam(questionInExam: QuestionInExam[]): Observable<QuestionInExam> {
    return this.httpClient.post<QuestionInExam>(this.API_URL + '/addQuestionInExam', questionInExam);
  }

  updateQuestion(question: Question): Observable<Question> {
    return this.httpClient.patch<Question>(this.API_URL + '/edit-question' + question.questionId, question);
  }

  getAllTest(): Observable<Test[]> {
    return this.httpClient.get<Test[]>(this.API_URL + '/getAllTest');
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<HttpEvent<any>>(this.uploadFile, formData);
  }

  getAllSubject(): Observable<Subject[]>{
    return this.httpClient.get<Subject[]>(this.API_URL + '/getAllSubject');
  }
}

