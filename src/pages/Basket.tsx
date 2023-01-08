import React from 'react';
import { useSelector } from 'react-redux';
import { selectBaskets, selectTotalAmount } from '../store/store';
import styles from '../styles/all-products.module.scss';
import { ProductList } from '../components/ProductList';

function Basket() {
  const baskets = useSelector(selectBaskets);
  const totalAmount = useSelector(selectTotalAmount);
  console.log(baskets);
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Basket</h1>
      <ProductList type="basket" data={baskets} />
      <div className={styles.total_amount_wrapper}>
        <h2 className={styles.total_amount_text}>Total Amount</h2>
        <p className={styles.total_amount}> {totalAmount}$</p>
      </div>
    </div>
  );
}

export default Basket;
