import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerAsyncThunk } from './RegisterSlice.js'
import { useDispatch } from 'react-redux'
import './Register.css'

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== passwordConfirm) {
            alert('Passwords do not match')
            return
        }

        const data = {
            username: firstName.toLowerCase(),
            email,
            password,
            name:{
                firstname: firstName,
                lastname: lastName
            },
            address:{
                city:'kilcoole',
                street:'7835 new road',
                number:3,
                zipcode:'12926-3874',
                geolocation:{
                    lat:'-37.3159',
                    long:'81.1496'
                }
            },
            phone:'1-570-236-7033'
        }

        dispatch(registerAsyncThunk(data))
        navigate('/login')
    }

    


  return (
        <div className='register-container'>
            <form method='POST'>
                <div className='input-container'>
                    <div className='div'>
                        <label>First Name</label>
                        <input type='text' name='fname' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div className='div'>
                        <label>Last Name</label>
                      <input type='text' name='lname' value={lastName} onChange={(e) => setLastName(e.target.value) } />
                    </div>
                    <div className='div'>
                        <label>E-mail</label>
                      <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value) } />
                    </div>
                    <div className='div'>
                        <label>Password</label>
                        <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value) } />
                    </div>
                    <div className='div'>
                        <label>Conform Password</label>
                        <input type='password' name='password2' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value) } />
                    </div>
                    <div className='btn-div'>
                        <button className='btn-register' type='submit' onClick={handleSubmit}>Register</button>
                    </div>
                </div>
                <div className='login-div'>
                    <p>Already have an account? <Link className='login-link' to='/login'>Login</Link> </p>
                </div>
            </form>    
        </div>
  )
}

export default Register