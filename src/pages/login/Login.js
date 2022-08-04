import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAsyncThunk } from './loginSlice'
import { useDispatch, useSelector } from 'react-redux'
import './Login.css'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [username, setUserName] = useState('mor_2314')
  const [password, setPassword] = useState('83r5^_')

  const loginData = useSelector(state => state.login.data)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      username,
      password
    }
    dispatch(loginAsyncThunk(data))
  }

  if (loginData && loginData.token) { 
    localStorage.setItem('token', loginData.token)
    navigate('/')
  }

  return (
    <div className='login-container'>
        <form>
          <div className='input-container'>
            <div className='email-div'>
              <label>User Name</label>
            <input type='text' name='username' value={username} onChange={(e) => setUserName(e.target.value) } />
            </div>
            <div className='password-div'>
              <label>Password</label>
              <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='btn-div'>
              <button className='login-btn' type='submit' onClick={handleSubmit}>Login</button>
            </div>
          </div>
          <div className='register-btn'>
            <p>Don't have an account? <Link className='register-link' to='/register'>Register</Link> </p>
          </div>
        </form>  
    </div>
  )
}

export default Login