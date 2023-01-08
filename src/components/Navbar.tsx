import React, { PropsWithChildren } from 'react';
import styles from '../styles/nav.module.scss';
import { useDarkMode } from '../hooks/useDarkMode';
import { FiMenu } from 'react-icons/fi';
import { HiBackspace } from 'react-icons/hi';
import { FaProductHunt } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import { Link, useMatch } from 'react-router-dom';
function NavLink({ children, to, style }: PropsWithChildren<{ to: string; style?: object }>) {
  const active = useMatch(to);
  return (
    <Link to={to} style={style} className={active ? styles.match : ''}>
      {children}
    </Link>
  );
}
function Navbar() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <header className={styles.header}>
      <div className={styles.row}>
        <a
          href="#main-menu"
          id="main-menu-toggle"
          className={styles.menu_toggle}
          aria-label="Open main menu"
        >
          <FiMenu size={30} />
        </a>

        <div className={styles.logo}>
          <NavLink to="/" style={{ border: 'none' }}>
            <span>
              <img src="/vite.svg" />
            </span>
          </NavLink>
        </div>
      </div>
      <nav id="main-menu" className={styles.nav}>
        <a
          href="#main-menu-toggle"
          id="main-menu-close"
          className={styles.menu_close}
          aria-label="Close main menu"
        >
          <HiBackspace size={30} />
        </a>

        <ul className={styles.nav_list}>
          <li className={styles.nav_list_item}>
            <NavLink to="/all-products">
              <span>
                <FaProductHunt />
              </span>
              All Products
            </NavLink>
          </li>
          <li className={styles.nav_list_item}>
            <NavLink to="/my-favorites">
              <span>
                <MdFavorite />
              </span>
              My Favorites
            </NavLink>
          </li>
          <li className={styles.nav_list_item}>
            <NavLink to="/basket">
              <img src="/basket.svg" width={40} height={40} />
            </NavLink>
          </li>
          <li className={styles.nav_list_item}>
            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode((val) => !val)}
              />
              <span className="slider round"></span>
            </label>
          </li>
        </ul>
      </nav>
      <a href="#main-menu-toggle" className={styles.backdrop} tabIndex={-1} hidden></a>
    </header>
  );
}

export { Navbar };
