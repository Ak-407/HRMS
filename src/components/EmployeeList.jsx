import styles from './EmployeeList.module.css';
import { HiOutlineTrash } from 'react-icons/hi';

function EmployeeList({ employees, onDelete }) {
  if (employees.length === 0) {
    return <div className={styles.empty}>No employees found.</div>;
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.employee_id}</td>
              <td>{emp.full_name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>
                <button
                  className={styles.deleteBtn}
                  onClick={() => onDelete(emp.id)}
                  title="Delete employee"
                >
                  <HiOutlineTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;