import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuestionBankDeleteComponent} from './question/question-bank-delete/question-bank-delete.component';
import { MessengerComponent } from './messenger/messenger.component';

const routes: Routes = [
  {path: 'question-delete', component: QuestionBankDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [MessengerComponent]
})
export class AppRoutingModule {
}
