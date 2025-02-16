import { Student } from '../models/Student';
import { Session } from '../models/Session';
import { AttendanceData } from '../types/AttendanceData';

// Initial students data
export const initialStudents: Student[] = [
  new Student(1, "John Smith"),
  new Student(2, "Jane Doe"),
  new Student(3, "Bob Wilson")
];

// Initial sessions (dates)
export const initialSessions: Session[] = [
  new Session("2024-01-15"),
  new Session("2024-01-22"),
  new Session("2024-01-29")
];

// Initial attendance data
export const initialAttendance: AttendanceData[] = initialStudents.map(student => ({
  student,
  sessions: initialSessions.reduce((acc, session) => {
    acc[session.date] = false;
    return acc;
  }, {} as Record<string, boolean>)
})); 