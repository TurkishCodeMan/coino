import useFetch from '../hooks/useFetch';
import { Product } from '../types';
import styles from '../styles/all-products.module.scss';
import { ProductList } from '../components/ProductList';
import React from 'react';
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';
import { MdCleaningServices } from 'react-icons/md';
function filterQuery(query: string, arr: Product[]) {
  return arr.filter((val: Product) => val.title.toLowerCase().includes(query.toLowerCase()));
}
function sortByRating(arr: Product[]) {
  return arr.sort((val, val2) => val.rating - val2.rating);
}
function sortByPrice(arr: Product[]) {
  return arr.sort((val, val2) => val.price - val2.price);
}
export function AllProducts() {
  const { data, error } = useFetch<{ products: Product[] }>('../data/product.json');
  const [query, setQuery] = React.useState('');
  const [sorting, setSorting] = React.useState(false);
  function filteredProducts() {
    return filterQuery(query, data?.products ?? []);
  }
  const [products, setProducts] = React.useState<Product[]>();

  function sortByRatingProducts() {
    setSorting(true);
    return setProducts(() => [...sortByRating(data?.products ?? []).reverse()]);
  }
  function sortByRatingProductsDesc() {
    setSorting(true);
    return setProducts(() => [...sortByRating(data?.products ?? [])]);
  }
  function sortByPriceProducts() {
    setSorting(true);
    return setProducts(() => [...sortByPrice(data?.products ?? []).reverse()]);
  }
  function sortByPriceProductsDesc() {
    setSorting(true);
    return setProducts(() => [...sortByPrice(data?.products ?? [])]);
  }
  React.useEffect(() => {
    setProducts(() => [...filteredProducts().reverse()]);
  }, [data]);

  React.useEffect(() => {
    setProducts(filteredProducts());
  }, [query]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.filter_wrapper}>
        <div className={styles.input_wrapper}>
          <input
            className={styles.input}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            placeholder="Search.."
          />
        </div>
        <div>
          <Menu>
            <MenuButton
              style={{
                padding: '.5rem 1rem',
                borderRadius: '5px',
                backgroundColor: 'var(--util-color)'
              }}
            >
              Sortings
            </MenuButton>
            <MenuList>
              <MenuItem onSelect={sortByRatingProducts}>
                Önem derecesine göre azalan sıralama
              </MenuItem>
              <MenuItem onSelect={sortByRatingProductsDesc}>
                Önem derecesine göre artan sıralama
              </MenuItem>

              <MenuItem onSelect={sortByPriceProducts}>Fiyata göre azalan sıralama</MenuItem>
              <MenuItem onSelect={sortByPriceProductsDesc}>Fiyata göre artan sıralama</MenuItem>
            </MenuList>
          </Menu>
        </div>
        {sorting && (
          <MdCleaningServices
            onClick={() => {
              setSorting(false);
              return setProducts(() => [...filteredProducts().sort(() => Math.random() - 0.5)]);
            }}
            style={{ cursor: 'pointer' }}
            color="var(--util-color)"
            size={40}
          />
        )}
      </div>
      <h1 className={styles.title}>All Products</h1>

      <ProductList type="all-products" data={products ?? []} />
    </div>
  );
}
