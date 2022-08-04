import React, { useEffect } from 'react'
import '../home/Home.css'
import { fetchProductByCategoryAsync } from '../../features/product/productSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToCart } from '../cart/cartSlice';

const Categories = () => {

  const dispatch = useDispatch()
  const params = useParams()

  const products = useSelector(state => state.product.products);
  const loading = useSelector(state => state.product.loading);
  const error = useSelector(state => state.product.error);
  const { category } = params;

  useEffect(() => {
    if (products[category] === undefined || products[category].length === 0) {
      dispatch(fetchProductByCategoryAsync(category));
    }
  }, [dispatch, category, products])

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
      {products[category] !== undefined ? products[category].map(product => (
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

export default Categories