export class Question {
  no: number;
  questionId: string;
  questionName: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  rightAnswer: string;
  testId: number[];
  subjectId;
  subjectName;

  constructor(questionId: string, question: string, answerA: string, answerB: string, answerC: string, answerD: string,
              rightAnswer: string, testId: number[], subjectId) {
    this.questionId = questionId;
    this.questionName = question;
    this.answerA = answerA;
    this.answerB = answerB;
    this.answerC = answerC;
    this.answerD = answerD;
    this.rightAnswer = rightAnswer;
    this.testId = testId;
    this.subjectId = subjectId;
  }

}


