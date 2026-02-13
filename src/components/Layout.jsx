import { NavLink, Outlet } from 'react-router-dom';
import { HiOutlineUserGroup, HiOutlineCalendar } from 'react-icons/hi';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>HRMS</div>
        <nav className={styles.nav}>
          <NavLink
            to="/employees"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            <HiOutlineUserGroup className={styles.icon} />
            <span>Employees</span>
          </NavLink>
          <NavLink
            to="/attendance"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            <HiOutlineCalendar className={styles.icon} />
            <span>Attendance</span>
          </NavLink>
        </nav>
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;