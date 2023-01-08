import React from 'react';
import { useSelector } from 'react-redux';
import { selectFavorites } from '../store/store';
import styles from '../styles/all-products.module.scss';
import { ProductList } from '../components/ProductList';

export function MyFavorites() {
  const favorites = useSelector(selectFavorites);
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Favorites</h1>
      <ProductList type="favorites" data={favorites} />
    </div>
  );
}
