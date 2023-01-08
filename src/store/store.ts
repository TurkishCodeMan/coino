import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Product, ProductWithQuantity } from '../types';

function saveToLocalStorage(state: ProductSlicesState) {
  console.log('Save');
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('persistantState', serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage(): ProductSlicesState | undefined {
  try {
    const serialisedState = localStorage.getItem('persistantState');
    if (serialisedState === null) return initialState;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}
interface ProductSlicesState {
  favoriteProducts: Product[];
  basketProducts: ProductWithQuantity[];
  totalAmount: number;
}

const initialState: ProductSlicesState = {
  favoriteProducts: [],
  basketProducts: [],
  totalAmount: 0
};

export const productSlice = createSlice({
  name: 'product',
  initialState: loadFromLocalStorage() ?? initialState,
  reducers: {
    initialFavorites: (state, action) => {
      state.favoriteProducts = action.payload;
    },
    initialBaskets: (state, action) => {
      state.basketProducts = action.payload;
    },
    addFavorite: (state, action) => {
      state.favoriteProducts = [...state.favoriteProducts, action.payload];
    },

    removeFavorite: (state, action) => {
      if (state.favoriteProducts.length == 1) {
        state.favoriteProducts = [];
      } else
        state.favoriteProducts = state.favoriteProducts.filter((val) => val.id !== action.payload);
    },
    addBasket: (state, action) => {
      if (state.basketProducts.includes(action.payload))
        state.basketProducts = [...state.basketProducts, action.payload];
      else {
        state.basketProducts = state.basketProducts.filter((val) => val.id !== action.payload.id);
        state.basketProducts = [...state.basketProducts, action.payload];
      }
    },

    removeBasket: (state, action) => {
      if (state.basketProducts.length == 1) {
        state.basketProducts = [];
      } else state.basketProducts = state.basketProducts.filter((val) => val.id !== action.payload);
    }
  }
});
export const {
  initialBaskets,
  initialFavorites,
  addBasket,
  addFavorite,
  removeBasket,
  removeFavorite
} = productSlice.actions;

const store = configureStore({
  reducer: {
    products: productSlice.reducer
  }
});

store.subscribe(() => saveToLocalStorage(store.getState().products));

type RootState = ReturnType<typeof store.getState>;

export const selectFavorites = (state: RootState) => state.products.favoriteProducts;
export const selectBaskets = (state: RootState) => state.products.basketProducts;
export const selectTotalAmount = (state: RootState) =>
  state.products.basketProducts.reduce((acc, curr) => curr.price * curr?.quantity + acc, 0);
export default store;
