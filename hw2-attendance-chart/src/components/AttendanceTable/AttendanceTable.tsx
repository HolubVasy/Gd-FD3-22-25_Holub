   import React, { useState, useEffect } from 'react';
   import './AttendanceTable.css';
   import { Student } from '../../models/Student';
   import { Session } from '../../models/Session';
   import { AttendanceData } from '../../types/AttendanceData';
   import { initialStudents, initialSessions, initialAttendance } from '../../data/initialData';

   function AttendanceTable() {
  const loadInitialData = () => {
    try {
      const savedData = localStorage.getItem('attendanceData');
      if (savedData) {
        return JSON.parse(savedData) as AttendanceData[];
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
    return initialAttendance;
  };

  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [attendance, setAttendance] = useState<AttendanceData[]>(loadInitialData());
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const toggleAttendance = (studentId: number, date: string) => {
    setAttendance(prev => prev.map(data => data.student.id === studentId
      ? {
        ...data,
        sessions: {
          ...data.sessions,
          [date]: !data.sessions[date],
        },
      }
      : data
    )
    );
  };

  const addStudent = () => {
    const name = prompt('Enter student name');
    if (name) {
      const newStudent = new Student(students.length + 1, name);
      setStudents([...students, newStudent]);
      setAttendance([
        ...attendance,
        {
          student: newStudent,
          sessions: sessions.reduce((acc, session) => {
            acc[session.date] = false;
            return acc;
          }, {} as Record<string, boolean>),
        },
      ]);
    }
  };

  const addSession = () => {
    const date = prompt('Enter session date (YYYY-MM-DD)');
    if (date) {
      const newSession = new Session(date);
      setSessions([...sessions, newSession]);
      setAttendance(prev => prev.map(data => ({
        ...data,
        sessions: { ...data.sessions, [date]: false },
      }))
      );
    }
  };

  const saveData = () => {
    setIsSaving(true);

    try {
      localStorage.setItem('attendanceData', JSON.stringify(attendance));

      setTimeout(() => {
        setIsSaving(false);
      }, 2000);

    } catch (error) {
      console.error('Error saving data to localStorage:', error);
      alert('Error saving data!');
      setIsSaving(false);
    }
  };

  return (
    <div>
      <button onClick={addStudent}>Add Student</button>
      <button onClick={addSession}>Add Date</button>
      <table>
        <thead>
          <tr>
            <th style={{ width: '40px' }}>#</th>
            <th className="name-column">Name</th>
            {sessions.map(session => (
              <th key={session.date} className="date-column">{session.date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {attendance.map((data, index) => (
            <tr key={data.student.id}>
              <td>{index + 1}</td>
              <td className="name-column">{data.student.name}</td>
              {sessions.map(session => (
                <td
                  key={session.date}
                  onClick={() => toggleAttendance(data.student.id, session.date)}
                  className="attendance-cell"
                >
                  <span className="attendance-mark">
                    {data.sessions[session.date] ? '✔' : '✘'}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={saveData}
        disabled={isSaving}
      >
        {isSaving ? 'Идёт сохранение...' : 'Сохранить'}
      </button>
    </div>
  );
}

   export default AttendanceTable;