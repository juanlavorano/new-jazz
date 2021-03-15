import React from 'react'
import {useSelector} from 'react-redux'

export function MyAccount() {
    const {currentUser} = useSelector(state => state.user)
    return (
        <div>
            <p>Username: {currentUser.username}</p>
            <p>Email: {currentUser.email}</p>
        </div>
    )
}
