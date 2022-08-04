import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductAsync } from '../../features/product/productSlice';
import { addToCart } from '../cart/cartSlice';
import './Home.css'


const HomePage = () => {
  const dispatch = useDispatch();
  const filterProducts = useSelector(state => state.product.filterProducts);
  const loading = useSelector(state => state.product.loading);
  const error = useSelector(state => state.product.error);

  useEffect(() => {
    if (filterProducts === undefined || filterProducts.length === 0) {
      dispatch(fetchProductAsync());
    }
  }
    , [filterProducts, dispatch]);
  
  if (loading) {
    return <div className='loading-container'>
      <div className='loader'></div>
    </div>
  }
  if (error) {
    return <div className='error-container'>Error: {error.message}</div>
  }


  return (
      <div className='main-container'>
      {filterProducts.length > 0 ? filterProducts.map(product => (
            <div className='product-container' key={product.id}>
              <img src={product.image} alt={product.title} />
              <p>Price: ${product.price}</p>
              <p className='product-title'>{product.title}</p>
              <div className='btn'>
                <button className='add-btn' onClick={() => dispatch(addToCart({product}))} >Add to Cart</button>
              </div>
            </div>
        )) : <div className='no-product-container'>No product found</div>}
    </div>
  )
}

export default HomePage