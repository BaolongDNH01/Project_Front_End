import {Exam} from '../../exam/exam';

export interface User {
  id: number;
  username: string;
  user_password: string;
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  examList: Exam[];
  // roles: Role[];
}
