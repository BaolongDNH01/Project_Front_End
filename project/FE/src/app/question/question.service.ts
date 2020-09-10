import {Injectable} from '@angular/core';
import {Question} from './question';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Test} from '../test/test';
import {QuestionInExam} from './question-in-exam';
import {Subject} from "./subject";


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  question: Question;
  API_URL = 'http://localhost:8080';
  uploadFile = 'http://localhost:8080/uploadFile';

  constructor(
    private httpClient: HttpClient
  ) {
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

  deleteQuestionInExam(id: string): Observable<QuestionInExam> {
    return this.httpClient.delete<QuestionInExam>(this.API_URL + '/delete-question-in-exam/' + id);
  }

  saveQuestion(question: Question): Observable<any> {
    return this.httpClient.post<any>(this.API_URL + '/create-question', question);
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

