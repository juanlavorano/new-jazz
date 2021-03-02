import React from 'react';
import axios from 'axios'
import { MainAlbum } from './MainAlbum'
import { albumDb } from '../assets/albumsdb'
import { useDispatch, useSelector } from 'react-redux'
import { setMainAlbum } from './actions/album'
import {About} from './About'

export function Home() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.spotifyToken)

  const handleClick = (e) => {
    e.preventDefault()
    const rNumber = () => Math.floor(Math.random() * albumDb.length)
    const albumName = albumDb[rNumber()].name

    axios(`https://api.spotify.com/v1/search?q=${albumName}&type=album,artist&limit=1`, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      method: 'GET',
    })
      .then(res => dispatch(setMainAlbum(res.data.albums.items[0])))
  }
    

  return (
    <div className='home'>
      <div className='hero padding-global'>
        <MainAlbum />
        <div className='hero__background'></div>
        <div className='hero__right'>
          <h2 className='hero__right__header'>Discover new music</h2>
          <p className='hero__right__text'>New recommendations, every day</p>
          <button onClick={handleClick} className='button hero__right__button'>Show me more</button>
        </div>
      </div>
      <About />
    </div>
    );
  }

