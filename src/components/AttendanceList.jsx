import styles from './AttendanceList.module.css';

function AttendanceList({ records, presentCount }) {
  if (records.length === 0) {
    return <div className={styles.empty}>No attendance records found.</div>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Attendance Records</h3>
        <span className={styles.badge}>Present days: {presentCount}</span>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.date}</td>
                <td className={rec.status === 'Present' ? styles.present : styles.absent}>
                  {rec.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceList;