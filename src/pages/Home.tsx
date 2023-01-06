import React from 'react';
import styles from '../styles/home.module.scss';

export function Home() {
  return (
    <div className={styles.home}>
      <img className={styles.home_img} src="/hero.webp" />
    </div>
  );
}
