import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import api from './API.js'
import {logUserIn} from './actions/user'

export function SignIn() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const user = {
            username,
            password
        }

        api({
            method: 'POST',
            url:`/users/login`,
            data: user
        })
            .then(res => {
                if (res.status == 200) {
                    dispatch(logUserIn(res.data.user))
                    history.push('/')
                } else {
                    setError(res.data)
                }
            })

    }

    return (
        <div className='sign-in'>
            <h2 className='sign-in__title'>Sign In page</h2>
            <form onSubmit={handleSubmit} className='sign-in__form'>
                <input className='sign-in__form__input' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username or email' type='text'></input>
                <input className='sign-in__form__input' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' type='password'></input>
                <button className='button sign-in__form__button' type='submit'>Submit</button>
            </form>
        </div>

    )
}