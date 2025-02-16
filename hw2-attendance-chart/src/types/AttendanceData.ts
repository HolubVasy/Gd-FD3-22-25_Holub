import { Student } from '../models/Student';

export type AttendanceData = {
  student: Student;
  sessions: Record<string, boolean>;
};