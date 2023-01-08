import { useDarkMode } from './hooks/useDarkMode';
import useFetch from './hooks/useFetch';
import { Navbar } from './components/Navbar';
import { Layout } from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import { AllProducts } from './pages/AllProducts';
import { MyFavorites } from './pages/MyFavorites';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import React from 'react';
import Basket from './pages/Basket';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Product } from './types';
import { useDispatch } from 'react-redux';
import { initialBaskets, initialFavorites } from './store/store';

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/all-products" element={<AllProducts />} />
      <Route path="/my-favorites" element={<MyFavorites />} />
      <Route path="/basket" element={<Basket />} />
    </Routes>
  );
}

function App() {
  return (
    <Layout>
      <Navbar />
      <main>
        <AllRoutes />
      </main>
      <Footer />
    </Layout>
  );
}

export default App;
