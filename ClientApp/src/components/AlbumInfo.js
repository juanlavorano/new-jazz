import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {useSelector} from 'react-redux'
import axios from 'axios'

export function AlbumInfo() {
    const { id } = useParams()
    const token = useSelector(state => state.user.spotifyToken)
    const [album, setAlbum] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            try {
                const album = await axios(`https://api.spotify.com/v1/albums/${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                    },
                    method: 'GET',
                })
                setAlbum(album.data)
                setLoading(false)
                console.log(album.data)
            } catch (err) {
                console.log(err)
            }       
        }
        if (loading) {
            fetch()
        }
    }, [loading])


    return (
        <div className='album-info padding-global'>
            <h1>Album Info Page</h1>
            {loading 
            ?
            <p>Loading</p>
            :
            <div className='album-info__div'>
                <div className='album-info__div__img'>
                    <img src={album.images[0].url} className='album-info__div__img__img'></img>
                    <a className='button album-info__div__img__button'></a>
                    <a className='button album-info__div__img__button'></a>
                </div>
                <div className='album-info__div__info'>
                    <p>Name: {album.name}</p>
                        <p>Artist: {album.artists[0].name}</p>
                    <p>Release Date: {album.release_date}</p>
                        <p>Tracks: {album.total_tracks}</p>
                        <ul className='album-info__div__info__tracks'>
                            {album.tracks.items.map(t => { return <li><a className='album-info__div__info__tracks__track' href={t.uri}>{t.name}</a></li>})}
                        </ul>
                </div>
        </div>
            }
        </div>
        )
}