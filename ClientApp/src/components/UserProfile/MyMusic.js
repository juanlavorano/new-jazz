import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import api from '../API'
import { useSelector } from 'react-redux'

export function MyMusic() {
    const { currentUser } = useSelector(state => state.user)
    const token = useSelector(state => state.user.spotifyToken)
    const [albums, setAlbums] = useState([])

    useEffect (() => {
        fetchFavs()
    }, [])

    const fetchFavs = async () => {
        const ids = []

        // Get favs ids from database
        const dbIds = await api({
            method: 'GET',
            url: '/favalbums/get-all',
            params: {
                user_id: currentUser.user_id
            }
        })
        dbIds.data.forEach(a => {
            ids.push(a.spotify_id)
        })

        // Get albums from Spotify API
        const albumArray = []

        const album = await axios(`https://api.spotify.com/v1/albums?ids=${ids}`, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
        method: 'GET',
        })
        album.data.albums.forEach(a => {
            albumArray.push(a)
        })
        setAlbums(albumArray)
        console.log(albumArray)
    }

    return (
        <div>
            {albums == []
                ?
                <p>Loading</p>
                :
                <div className='my-music'>
                    {albums.map(a => (
                        <div className='my-music__album'>
                            <img className='my-music__album__img' src={a.images[0].url} style={{ height: '100px' }}></img>
                            <div className='my-music__album__info'>
                                <h3>{a.name}</h3>
                                <p>{a.artists[0].name}</p>
                                <Link to={`/album-info/${a.id}`} style={{textDecoration: 'none'}}>
                                    <p className='button my-music__album__info__button'>Album info</p>
                                </Link> 
                            </div>
                        </div>
                    ))
                    }
                </div>
            }
        </div>
    )
}