import React from 'react';
import styles from '../styles/all-products.module.scss';
import { Product } from '../types';
import { FaInfo } from 'react-icons/fa';
import { BsBasket } from 'react-icons/bs';
export function ProductList({ data }: { data: Product[] }) {
  return (
    <div className={styles.card_list}>
      {data?.map((data: Product) => (
        <div key={data.id} className={styles.card_wrapper}>
          <div className={styles.card_header}>
            <img width={220} className={styles.card_thumbnail} src={data.thumbnail} />
          </div>
          <div className={styles.content_wrapper}>
            <div className={styles.card_content}>
              <h3>{data.title}</h3>
              <p>{data.price}$</p>
            </div>
            <div className={styles.add_basket}>
              <BsBasket size={40} color={'var(--util-color)'} />
            </div>
          </div>
          <span className={styles.info_area}>
            <FaInfo />
            <div className={styles.card_info}>
              <table>
                <tbody>
                  <tr>
                    <th>Category</th>
                    <th>{data.category}</th>
                  </tr>
                  <tr>
                    <td>Stock</td>
                    <td>{data.stock}</td>
                  </tr>
                  <tr>
                    <th>Rating</th>
                    <th>{data.rating}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </span>
        </div>
      ))}
    </div>
  );
}
