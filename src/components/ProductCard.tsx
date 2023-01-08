import React from 'react';
import { Product, ProductWithQuantity } from '../types';
import styles from '../styles/product-card.module.scss';
import { BsBasket } from 'react-icons/bs';
import { FaInfo } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import {
  removeFavorite,
  selectFavorites,
  addFavorite,
  addBasket,
  selectBaskets,
  removeBasket
} from '../store/store';
import { toast } from 'react-toastify';
import { Modal, ModalContents, ModalOpenButton } from './Modal';
import stylesCustomComponent from '../styles/custom-component.module.scss';
import { dequal } from 'dequal';
export function ProductCard({ data, type }: { data: ProductWithQuantity; type: string }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const notifyBasket = () => toast(`${data.title} add basket !`);
  const notifyFavorite = () => toast(`${data.title} add favorites !`);
  const notifyRemoveFavorite = () => toast(`${data.title} remove favorites !`);
  const notifyRemoveBasket = () => toast(`${data.title} remove basket !`);
  const notifyRemoveBasketAddFavorites = () =>
    toast(`${data.title} remove basket and add favorites list !`);
  const [quantity, setQuantity] = React.useState(data?.quantity ? data?.quantity : 1);
  const productInFavorites = favorites.some((val) => val.id === data.id);
  const productInBasket = type === 'basket';
  function onAddBasket() {
    dispatch(addBasket({ ...data, quantity }));
    notifyBasket();
  }
  function onAddFavorite() {
    dispatch(addFavorite(data));
    notifyFavorite();
  }
  function onRemoveFavorite() {
    dispatch(removeFavorite(data.id));
    notifyRemoveFavorite();
  }
  function onRemoveBasket() {
    dispatch(removeBasket(data.id));
    notifyRemoveBasket();
  }
  function onRemoveBasketAndAddFavorites() {
    dispatch(removeBasket(data.id));
    onAddFavorite();
    notifyRemoveBasketAddFavorites();
  }

  const changedValue = data.quantity !== quantity;
  return (
    <div className={styles.card_wrapper}>
      <div className={styles.card_header}>
        <img alt={data.title} width={220} className={styles.card_thumbnail} src={data.thumbnail} />
      </div>
      <div className={styles.content_wrapper}>
        <div className={styles.card_content}>
          <h3>{data.title}</h3>
          <p>{data.price}$</p>
          <p>{data.stock} stock</p>
          <p className={styles.qty} id="qty">
            <label htmlFor="qty">Quantity:</label>
            <button
              onClick={() => (quantity > 1 ? setQuantity((val) => val - 1) : null)}
              className={styles.qtyminus}
              aria-hidden="true"
            >
              &minus;
            </button>
            <input
              min={1}
              max={data.stock}
              step={1}
              value={quantity}
              type="number"
              onChange={(val) => {
                if (+val.target.value >= 1) {
                  setQuantity(+val.target.value);
                }
              }}
            />{' '}
            <button
              onClick={() => (quantity < data.stock ? setQuantity((val) => val + 1) : null)}
              className={styles.qtyplus}
              aria-hidden="true"
            >
              +
            </button>
          </p>
        </div>
        <div className={styles.add_basket} onClick={onAddBasket}>
          {!productInBasket ? <BsBasket size={40} color={'var(--util-color)'} /> : null}
        </div>
        {productInFavorites && !productInBasket && (
          <div className={styles.add_basket} onClick={onRemoveFavorite}>
            <MdFavorite size={40} color={'var(--util-color)'} />
          </div>
        )}
        {!productInFavorites && !productInBasket && (
          <div className={styles.add_basket} onClick={onAddFavorite}>
            <MdOutlineFavoriteBorder size={40} color={'var(--util-color)'} />
          </div>
        )}
        {productInBasket ? (
          <Modal>
            <ModalOpenButton>
              <button
                className={[stylesCustomComponent.btn, stylesCustomComponent.err_btn].join(' ')}
              >
                Remove Basket
              </button>
            </ModalOpenButton>
            <ModalContents
              title="Basket"
              aria-label="Login form"
              style={{
                backgroundColor: 'var(--util-color)',
                borderRadius: '5px'
              }}
            >
              <p>Ürünü sepetten kaldırmak istediğinizden emin misiniz ?</p>
              <div className={styles.modal_content_btn_wrapper}>
                <button
                  onClick={onRemoveBasket}
                  className={[stylesCustomComponent.btn, stylesCustomComponent.secondary_btn].join(
                    ' '
                  )}
                >
                  Ürünü sepetten çıkar
                </button>
                {!productInFavorites && (
                  <button
                    onClick={onRemoveBasketAndAddFavorites}
                    className={stylesCustomComponent.btn}
                  >
                    Ürünü sepetten çıkar ve favorilere ekle
                  </button>
                )}
              </div>
            </ModalContents>
          </Modal>
        ) : null}
      </div>
      {changedValue && productInBasket && (
        <button
          onClick={onAddBasket}
          className={[stylesCustomComponent.btn, stylesCustomComponent.secondary_btn].join(' ')}
        >
          Update Product
        </button>
      )}
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
  );
}
