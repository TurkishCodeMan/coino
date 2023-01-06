import React from 'react';
import styles from '../styles/nav.module.scss';
import { useDarkMode } from '../hooks/useDarkMode';
import { FiMenu } from 'react-icons/fi';
import { HiBackspace } from 'react-icons/hi';
import { FaProductHunt } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import { Link } from 'react-router-dom';
function Navbar() {
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <header className={styles.header}>
      <div className={styles.row}>
        <a
          href="#main-menu"
          id="main-menu-toggle"
          className={styles.menu_toggle}
          aria-label="Open main menu">
          <FiMenu size={30} />
        </a>

        <div className={styles.logo}>
          <Link to="/">
            <span>
              <img src="/vite.svg" />
            </span>
          </Link>
        </div>
      </div>
      <nav id="main-menu" className={styles.nav}>
        <a
          href="#main-menu-toggle"
          id="main-menu-close"
          className={styles.menu_close}
          aria-label="Close main menu">
          <HiBackspace size={30} />
        </a>

        <ul className={styles.nav_list}>
          <li className={styles.nav_list_item}>
            <Link to="/all-products">
              <span>
                <FaProductHunt />
              </span>
              All Products
            </Link>
          </li>
          <li className={styles.nav_list_item}>
            <Link to="#">
              <span>
                <MdFavorite />
              </span>
              My Favorites
            </Link>
          </li>
          <li className={styles.nav_list_item}>
            <a href="#">
              <img src="/basket.svg" width={40} height={40} />
            </a>
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
