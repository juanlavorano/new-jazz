import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { setMainAlbum } from './actions/album'
import { logUserOut } from './actions/user'
import logo from '../assets/NJ.svg'

export function NavMenu() {
  const [search, setSearch] = useState('')
  const [active, setActive] = useState(false)  
  const token = useSelector(state => state.user.spotifyToken) 
  const user = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch();
  
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
    setActive(!active)
    dispatch(logUserOut())
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
        {!user
          ?
          <div className='navbar__signs'>
            <Link to='/signin' className='button navbar__signs__button'>Sign In</Link>
            <Link to='/signup' className='button navbar__signs__button'>Sign Up</Link>
          </div>
          :
          <div className='navbar__user'>
            <p>Hi <a onClick={() => setActive(!active)}>{user.username}</a></p>
            <div className={active ? 'navbar__user__user-menu fade-in' : 'navbar__user__user-menu fade-out' }>
              <a className='navbar__user__user-menu__item'>Profile</a>
              <a className='navbar__user__user-menu__item'>Profile</a>
              <a className='navbar__user__user-menu__item' onClick={() => handleLogout()}>Logout</a>
            </div>
          </div>
        }
      </header>
    );
  }

