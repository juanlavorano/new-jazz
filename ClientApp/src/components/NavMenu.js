import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { setMainAlbum } from './actions/album'
import { logUserOut } from './actions/user'
import logo from '../assets/NJ.svg'

export function NavMenu() {
  const [search, setSearch] = useState('')
  const [active, setActive] = useState()  
  const token = useSelector(state => state.user.spotifyToken) 
  const {currentUser} = useSelector(state => state.user)
  const dispatch = useDispatch();
  const history = useHistory();
  
  const handleSearch = (e) => {
    e.preventDefault()
  
    axios(`https://api.spotify.com/v1/search?q=${search}&type=album,artist&limit=1`, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      method: 'GET',
    })
    .then(res => dispatch(setMainAlbum(res.data.albums.items[0])))
  }

  const handleLogout = () => {
    setActive('off')
    dispatch(logUserOut())
  }

  const handleProfile = () => {
    setActive('off')
    history.push(`/${currentUser.username}`)
  }

  const handleActive = () => {
    setActive(active == 'on' ? 'off' : active == 'off' || active == null ?'on' : null)
  }
  
    return (
      <header className='navbar padding-global'>
        <div className='navbar__logo'>
          <a href='/'><img src={logo}></img></a>
        </div>

        <form onSubmit={handleSearch}>
        <div className='navbar__search'>
            <input className='navbar__search__searchBar' type='text' placeholder='Search here' value={search} onChange={(e) => setSearch(e.target.value)}></input>
          <FaSearch  className='navbar__search__icon' size={20}/>
          </div>
        </form>
        {!currentUser
          ?
          <div className='navbar__signs'>
            <Link to='/signin' className='button navbar__signs__button'>Sign In</Link>
            <Link to='/signup' className='button navbar__signs__button'>Sign Up</Link>
          </div>
          :
          <div className='navbar__user'>
            <p>Hi <a onClick={() => handleActive()}>{currentUser.username}</a></p>
            <div className={active == 'on' ? 'navbar__user__user-menu fade-in' : active == 'off' ? 'navbar__user__user-menu fade-out' : 'inactive' }>
              <a className='navbar__user__user-menu__item' onClick={() => handleProfile()}>Profile</a>
              <a className='navbar__user__user-menu__item'>Profile</a>
              <a className='navbar__user__user-menu__item' onClick={() => handleLogout()}>Logout</a>
            </div>
          </div>
        }
      </header>
    );
  }

