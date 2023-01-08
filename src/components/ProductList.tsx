import React from 'react';
import styles from '../styles/all-products.module.scss';
import { Product, ProductWithQuantity } from '../types';
import { FaInfo } from 'react-icons/fa';
import { BsBasket } from 'react-icons/bs';
import { ProductCard } from './ProductCard';
export function ProductList({
  data,
  type
}: {
  type: string;
  data: Product[] | ProductWithQuantity[];
}) {
  return (
    <div className={styles.card_list}>
      {data?.map((data: Product) => (
        <ProductCard type={type} key={data.id} data={data as ProductWithQuantity} />
      ))}
    </div>
  );
}
