import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import api from './API.js'
import {logUserIn} from './actions/user'

export function SignUp() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const user = {
            username,
            email,
            password
        }

        try {
            await api({
                method: 'POST',
                url:`/users/new`,
                data: user
            })
                .then(res => {
                    dispatch(logUserIn(res.data))
                    history.push('/')
            })
        }
        catch (err) {
                setError(err.data) 
            }

    }

    return (
        <div className='sign-up'>
            <h2 className='sign-up__title'>Sign Up page</h2>
            <form onSubmit={handleSubmit} className='sign-up__form'>
                <input className='sign-up__form__input' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' type='text'></input>
                <input className='sign-up__form__input' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' type='text'></input>
                <input className='sign-up__form__input' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' type='password'></input>
                <input className='sign-up__form__input' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} placeholder='Repeat password' type='password'></input>
                <button className='button sign-up__form__button' type='submit'>Submit</button>
            </form>
        </div>
    )
}