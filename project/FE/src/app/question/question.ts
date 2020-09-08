export class Question {
  questionId: string;
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  rightAnswer: string;
  testId: number[];
  subjectId;

  constructor(questionId: string, question: string, answerA: string, answerB: string, answerC: string, answerD: string, rightAnswer: string, testId: number[], subjectId) {
    this.questionId = questionId;
    this.question = question;
    this.answerA = answerA;
    this.answerB = answerB;
    this.answerC = answerC;
    this.answerD = answerD;
    this.rightAnswer = rightAnswer;
    this.testId = testId;
    this.subjectId = subjectId;
  }
}


