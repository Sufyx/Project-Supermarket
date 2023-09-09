
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import './App.css';
import { UserProvider } from './contexts/UserContext';
import { ProductProvider } from './contexts/ProductContext';
import ProductGrid from './components/ProductGrid';
import ShoppingCart from './components/ShoppingCart';
import ProductsFilter from './components/ProductsFilter';



function App() {

  return (
    <UserProvider>
      <ProductProvider>
        <div className="App">
          <NavBar />
          <div className="mainContent">
            <ProductsFilter />
            <div className="cartAndGrid">
              <ShoppingCart />
              <ProductGrid />
            </div>
          </div>

          <Routes >
            <Route path="/home" element={<App />} />
          </Routes>

        </div>
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
