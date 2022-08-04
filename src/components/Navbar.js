import React, { useState, createRef, useEffect } from 'react';
import { Link, useLocation} from 'react-router-dom';
import './Navbar.css'
import { useSelector, useDispatch } from 'react-redux';
import { filter } from '../features/product/productSlice';





const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const quantity = useSelector(state => state.cart.quantity);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = createRef();
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e) => {
    let query = e.target.value;
    dispatch(filter({ query }));
  }


  useEffect(() => {
    if (location.pathname === '/') {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [location.pathname]);

  const handleToggle = () => {
    if (isOpen) {
      dropdownRef.current.classList.remove('open');
      setIsOpen(false);
    } else {
      dropdownRef.current.classList.add('open');
      setIsOpen(true);
    }
  }

  return (
    <div className='nav-container'>
      <div className='nav-bar'>
        <div className='logo'>
          <h3>Famazon</h3>
        </div>
        <input type='checkbox' id='check' />
        <label for="check" className='menu-icon'>
          <i class="ri-menu-line"></i>
        </label>
        <div className='nav-items'>
          <Link className="menu-link" to='/'>Home</Link>
          <div className='category-container'>
            <button className='category-button' onClick={handleToggle}>Categories</button>
            <div className='category-dropdown' ref={dropdownRef}>
              <Link className='category-link' to="/products/electronics">Electronics</Link>
              <Link className='category-link' to="/products/jewelery">Jewelery</Link>
              <Link className='category-link' to="/products/men's%20clothing">Men's clothing</Link>
              <Link className='category-link' to="/products/women's%20clothing">Women's clothing</Link>
            </div>
          </div>
          <Link className="menu-link" to='/login'>Login</Link>
        </div>
        <div className='like-cart-container'>
          <div className='cart'>
            <Link className='menu-btn' to='/cart'><i className="ri-shopping-cart-2-line"></i></Link>
            {quantity > 0 ? <span className='cart-quantity'>{quantity}</span> : null} 
          </div>
        </div>
      </div>
      <div className='search-bar'>
        {showSearch ? <input type='text' placeholder='Search' className='search' onChange={handleSearch} /> : null}
        
      </div> 
      
    </div>
  )
}

export default Navbar