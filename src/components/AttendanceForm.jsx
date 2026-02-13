import styles from './AttendanceForm.module.css';

function AttendanceForm({
  employees,
  selected,
  setSelected,
  date,
  setDate,
  status,
  setStatus,
  onMark,
  onView
}) {
  return (
    <div className={styles.card}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Employee</label>
        <select
          className={styles.select}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Date</label>
        <input
          type="date"
          className={styles.input}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Status</label>
        <select
          className={styles.select}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.primaryBtn} onClick={onMark}>
          Mark Attendance
        </button>
        <button className={styles.successBtn} onClick={onView}>
          View Records
        </button>
      </div>
    </div>
  );
}

export default AttendanceForm;