import useFetch from '../hooks/useFetch';
import { Product } from '../types';
import styles from '../styles/all-products.module.scss';
import { ProductList } from '../components/ProductList';
import React from 'react';
export function AllProducts() {
  const { data, error } = useFetch<{ products: Product[] }>('../data/product.json');
  console.log(data);
  return (
    <div className={styles.wrapper}>
      <ProductList data={data?.products ?? []} />
    </div>
  );
}
