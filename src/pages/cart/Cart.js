import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Cart.css'
import { addToCart,removeFromCart, removeItem, clearCart } from './cartSlice'


const Cart = () => {
  const dispatch= useDispatch()
  const items = useSelector(state => state.cart.items);
  const total = useSelector(state => state.cart.total);


  return (
    <div className='cart-container'>
      <div className='button'>
        <button className='remove-btn' onClick={() => dispatch(clearCart())}>Clear All</button>
      </div>
      {
        items.map(item => (
          <div className='cart-main-container' key={item.id}>
            <div className='cart-item-container'> 
              <div className='image-=section'>
                <img src={item.product.image} alt={item.product.title} />
              </div>
              <div className='item-details'>
                <p>{item.product.title}</p>
                <p>$ {item.product.price}</p>
                <div className='cart-item-actions'>
                  <p>{item.quantity}</p>
                  <div className='btn'>
                    <button className='up-btn' onClick={() => dispatch(addToCart({product:item.product}))}><i className="ri-arrow-drop-up-line"></i></button>
                    <button className='down-btn' onClick={() => dispatch(removeFromCart({product: item.product}))}><i className="ri-arrow-drop-down-line"></i></button>
                  </div>
                </div>

                <p>{(item.total).toFixed(2)}</p>
                <i className="ri-delete-bin-line" onClick={() => dispatch(removeItem({product:item.product}))}></i>
              </div>
            </div>
          </div>
        ))
      }
      {
        items.length > 0 ? <div className='cart-sub-container'>
        <p>Subtotal: {(total).toFixed(2)}</p>
        <p>Tax: {(total * 0.08).toFixed(2)}</p>
        <p>Total: {(total * 1.08).toFixed(2)}</p>
        </div>
        : null
      }
    </div>
  )
}

export default Cart