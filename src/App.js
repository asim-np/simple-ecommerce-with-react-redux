import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Counter from './features/counter/Counter';
import Navbar from './components/Navbar';
import HomePage from './pages/home/HomePage';
import Cart from './pages/cart/Cart';
import Categories from './pages/categories/Categories';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {
  return (
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products/:category' element={<Categories />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
