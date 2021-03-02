import React from 'react';
import { useSelector } from 'react-redux'
import { FaSpotify } from 'react-icons/fa'
import { RiInformationLine } from 'react-icons/ri'

export function MainAlbum(...props) {
    const mainAlbum = useSelector(state => state.albums.mainAlbum)
  
  return (
      <div className='main-album'>
          {!mainAlbum
              ?
              <h3>Sorry, we couldn't find what you are looking for</h3>
              :
              <div className='main-album__left'>
                  <h1>{mainAlbum.name}</h1>
                  <img src={mainAlbum.images[0].url}></img> 
                  <div className='main-album__left__buttons'>
                  <a className='button main-album__left__spotify-btn' href={mainAlbum.uri}>
                    <FaSpotify className='main-album__left__spotify-btn__item' size={20}/>
                    <p className='main-album__left__spotify-btn__item'>Listen now</p>
                  </a>
                  <a className='button main-album__left__info-btn' href={mainAlbum.uri}>
                    <RiInformationLine className='main-album__left__info-btn__item' size={20}/>
                    <p className='main-album__left__info-btn__item'>About this album</p>
                  </a> 
                </div>
              </div>
          }
      </div>
    );
  }
