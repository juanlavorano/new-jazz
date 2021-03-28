import React, {useEffect} from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { UserProfile } from './components/UserProfile/UserProfile';
import { AlbumInfo } from './components/AlbumInfo';
import { useDispatch, useSelector } from 'react-redux'
import { requestToken } from './components/actions/user'
import { Credentials } from './components/Credentials'
import {PrivateRoute} from './components/PrivateRoute'
import { setMainAlbum } from './components/actions/album'
import {albumDb} from './assets/albumsdb'

import axios from 'axios'

import './styles/main.css'

export default function App() {
  const dispatch = useDispatch()
  const credentials = Credentials()
  const token = useSelector(state => state.user.spotifyToken)
  
  useEffect(() => {
    const rNumber = () => Math.floor(Math.random() * albumDb.length)
    const albumName = albumDb[rNumber()].name

     axios('https://accounts.spotify.com/api/token', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(credentials.clientId + ':' + credentials.clientSecret)
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
      })
        .then((response) => {
          dispatch(requestToken(response.data.access_token))

           axios(`https://api.spotify.com/v1/search?q=${albumName}&type=album,artist&limit=1`, {
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
            },
            method: 'GET',
          })
            .then(res => dispatch(setMainAlbum(res.data.albums.items[0])))
        })
  }, [])

  return (
    <div>
      {!token
        ?
        <p>Loading</p>
        :
          <Layout>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/signin' component={SignIn} />
            <PrivateRoute exact path='/:username' component={UserProfile} />
            <Route exact path='/album-info/:id' component={AlbumInfo}/>
          </Layout >
      }
    </div>
    );
  
  }

