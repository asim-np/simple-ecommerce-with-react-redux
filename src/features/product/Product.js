import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProductAsync } from './productSlice'
import './ProductStyle.css'

const Product = () => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product.products);
    const loading = useSelector(state => state.product.loading);
    const error = useSelector(state => state.product.error);

    React.useEffect(() => {
        dispatch(fetchProductAsync());
    }, [dispatch])
    
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }
  return (
      <div className='main-container'>
          <h1>Product</h1>
          {product.map(product => (
              <div key={product.id}>
                  <img src={product.image} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p>$ {product.price}</p>
                </div>
                      
                  
              ))}
          
    </div>
  )
}

export default Product