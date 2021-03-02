import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//Configure Store and Persist
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import {rootReducer} from './components/reducers'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
let persistor = persistStore(store)

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');



ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename={baseUrl}>
        <App />
      </BrowserRouter>
      </PersistGate>
    </Provider>,
  rootElement);

registerServiceWorker();

