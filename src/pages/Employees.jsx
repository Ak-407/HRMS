import { useState, useEffect } from 'react';
import API from '../api';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import styles from './Employees.module.css';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchEmployees = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.get('/employees/');
      setEmployees(res.data);
    } catch {
      setError('Failed to load employees.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAdd = async (formData) => {
    try {
      await API.post('/employees/', formData);
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.email?.[0] || err.response?.data?.employee_id?.[0] || 'Error adding employee.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/employees/${id}/`);
      fetchEmployees();
    } catch {
      setError('Error deleting employee.');
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Employees</h1>
      {error && <div className={styles.error}>{error}</div>}
      <EmployeeForm onAdd={handleAdd} />
      {loading ? (
        <div className={styles.skeleton}>Loading employees...</div>
      ) : (
        <EmployeeList employees={employees} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default Employees;