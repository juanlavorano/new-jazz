import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import {MyAccount} from './MyAccount'
import {MyMusic} from './MyMusic'
import {Settings} from './Settings'

export function UserProfile() {
    const { currentUser } = useSelector(state => state.user)
    const [active, setActive] = useState('My account')

    const handleMenu = (e) => {
        setActive(e.innerHTML)
    }

    return (
        <div className='user-profile padding-global'>
            <h2>{currentUser.username}'s Profie</h2>
            <div className='user-profile__sections'>
                <a onClick={(e) => handleMenu(e.target)} className={`user-profile__sections__menu-item button ${active == 'My account' ? 'menu-item_active' : ''}`}>My account</a>
                <a onClick={(e) => handleMenu(e.target)} className={`user-profile__sections__menu-item button ${active == 'My Music'? 'menu-item_active' : ''}`}>My Music</a>
                <a onClick={(e) => handleMenu(e.target)} className={`user-profile__sections__menu-item button ${active == 'Settings' ? 'menu-item_active' : ''}`}>Settings</a>
            </div>
            <div className='user-profile__content'>
                {active == 'My account'
                    ?
                    <MyAccount />
                    : active == 'My Music'
                    ?
                    <MyMusic />
                    :
                    <Settings/>
                }
            </div>
        </div>
    )
}
