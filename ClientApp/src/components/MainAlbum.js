import React, { useState } from 'react';
import api from './API'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaSpotify } from 'react-icons/fa'
import { RiInformationLine } from 'react-icons/ri'
import { IoIosHeartEmpty } from 'react-icons/io'
import {IoIosHeart} from 'react-icons/io'

export function MainAlbum(...props) {
  const mainAlbum = useSelector(state => state.albums.mainAlbum)
  const currentUser = useSelector(state => state.user.currentUser)
  const { fav } = props[0]
  const { setFav } = props[0]
  
  return (
      <div className='main-album'>
          {!mainAlbum
              ?
              <h3>Sorry, we couldn't find what you are looking for</h3>
              :
              <div className='main-album__left'>
              <h1>{mainAlbum.name}</h1>
          <div className='main-album__left__img'>
            {!fav
              ?
              <IoIosHeartEmpty onClick={setFav} className='image-heart' size={35} />
              :
              <IoIosHeart onClick={setFav} className='image-heart' size={35}/>
            }
                <img src={mainAlbum.images[0].url}></img>
              </div>
                  <div className='main-album__left__buttons'>
                  <a className='button main-album__left__spotify-btn' href={mainAlbum.uri}>
                    <FaSpotify className='main-album__left__spotify-btn__item' size={20}/>
                    <p className='main-album__left__spotify-btn__item'>Listen now</p>
                  </a>
                  <Link to={`/album-info/${mainAlbum.id}`} className='button main-album__left__info-btn'>
                    <RiInformationLine className='main-album__left__info-btn__item' size={20}/>
                    <p className='main-album__left__info-btn__item'>About this album</p>
                  </Link> 
                </div>
              </div>
          }
      </div>
    );
  }
