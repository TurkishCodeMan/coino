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
function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/all-products" element={<AllProducts />} />
      <Route path="/my-favorites" element={<MyFavorites />} />
    </Routes>
  );
}

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

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
