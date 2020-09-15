import {Exam} from '../../exam/exam';

export interface User {
  id: number;
  username: string;
  userPassword: string;
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  avatar: string;
  examList: Exam[];
  // roles: Role[];
}
