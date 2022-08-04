import React from 'react'
import { increment, decrement } from './counterSlice'
import { useSelector, useDispatch } from 'react-redux'

const Counter = () => {
    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()

  return (
        <div>
            <h1>Counter</h1>
            <button onClick={() => dispatch(increment())}>+</button>
            <span>{count}</span>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>
  )
}

export default Counter