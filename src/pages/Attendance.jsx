import { useState, useEffect } from 'react';
import API from '../api';
import AttendanceForm from '../components/AttendanceForm';
import AttendanceList from '../components/AttendanceList';
import styles from './Attendance.module.css';

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Present');
  const [records, setRecords] = useState([]);
  const [presentCount, setPresentCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await API.get('/employees/');
        setEmployees(res.data);
      } catch {
        setError('Failed to load employees.');
      }
    };
    fetchEmployees();
  }, []);

  const fetchAttendance = async () => {
    if (!selected) {
      setError('Please select an employee.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await API.get(`/attendance/list/?employee=${selected}`);
      setRecords(res.data.records);
      setPresentCount(res.data.total_present_days);
    } catch {
      setError('Failed to load attendance records.');
    } finally {
      setLoading(false);
    }
  };

  const handleMark = async () => {
    if (!selected || !date) {
      setError('Please select employee and date.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await API.post('/attendance/', { employee: selected, date, status });
      await fetchAttendance();
    } catch (err) {
      setError(err.response?.data?.non_field_errors?.[0] || 'Attendance already marked for this date.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Attendance</h1>
      {error && <div className={styles.error}>{error}</div>}
      <AttendanceForm
        employees={employees}
        selected={selected}
        setSelected={setSelected}
        date={date}
        setDate={setDate}
        status={status}
        setStatus={setStatus}
        onMark={handleMark}
        onView={fetchAttendance}
      />
      {loading ? (
        <div className={styles.skeleton}>Loading attendance records...</div>
      ) : (
        <AttendanceList records={records} presentCount={presentCount} />
      )}
    </div>
  );
}

export default Attendance;