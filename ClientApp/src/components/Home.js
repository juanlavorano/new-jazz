import React, { useEffect, useState } from 'react';
import axios from 'axios'
import api from './API'
import { albumDb } from '../assets/albumsdb'
import { setMainAlbum } from './actions/album'
import { MainAlbum } from './MainAlbum'
import { useDispatch, useSelector } from 'react-redux'
import { About } from './About'

export function Home() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.spotifyToken)
  const { currentUser } = useSelector(state => state.user)
  const { mainAlbum } = useSelector(state => state.albums)
  const [fav, setFav] = useState(false)

  const fetch = async () => {
    const rNumber = () => Math.floor(Math.random() * albumDb.length)
    const albumName = albumDb[rNumber()].name
    setFav(false)

    const album = await axios(`https://api.spotify.com/v1/search?q=${albumName}&type=album,artist&limit=1`, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      method: 'GET',
    })
      .then(res => dispatch(setMainAlbum(res.data.albums.items[0])))
    
    const favAlbum = {
      spotify_id: album.payload.album.id,
      user_id: currentUser.user_id
    }
    
    const fav = await api({
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      url: `/favalbums/get-fav`,
      params: favAlbum
    })
      .then(res => {
        if (res.status == 200)
        {
          setFav(true)  
        } else {
          setFav(false)
        }
      })
  }

  const handleClick =  (e) => {
    e.preventDefault()
    fetch()
  }

  useEffect(() => {
    fetch()
  }, [])
    
  const handleFav = async () => {

    const album = {
      spotify_id: mainAlbum.id,
      user_id: currentUser.user_id
    }
    
    if (fav == false)
    {
      // Add to Favourites
      await api({
          method: 'POST',
          url:`/favalbums/add`,
          data: album
    })
       .then(() => setFav(true))
    } else if (fav == true)
    {
      // Remove from Favourites
      await api({
        method: 'DELETE',
        url:`/favalbums/remove`,
        data: album
    })
       .then(() => setFav(false))
    }
  }

  return (
    <div className='home'>
      <div className='hero padding-global'>
        <MainAlbum fav={fav} setFav={handleFav}/>
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

