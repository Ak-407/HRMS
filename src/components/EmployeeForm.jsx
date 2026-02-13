import { useState } from 'react';
import styles from './EmployeeForm.module.css';

function EmployeeForm({ onAdd }) {
  const [form, setForm] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.employee_id || !form.full_name || !form.email || !form.department) {
      setError('All fields are required');
      return;
    }
    setError('');
    onAdd(form);
    setForm({ employee_id: '', full_name: '', email: '', department: '' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Add New Employee</h3>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <input
            type="text"
            name="employee_id"
            placeholder="Employee ID"
            value={form.employee_id}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Add Employee</button>
      </form>
    </div>
  );
}

export default EmployeeForm;