import { AttendanceData } from './AttendanceData';
import { Session } from '../models/Session';

export type StudentProps = {
  data: AttendanceData[];
  sessions: Session[];
};