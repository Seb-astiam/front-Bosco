import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Redux/store.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import axiosJwt from "./utils/axiosJwt.js";


const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

axios.defaults.baseURL = 'https://back-bosco.up.railway.app/'
axiosJwt.defaults.baseURL = 'https://back-bosco.up.railway.app/'
// axiosJwt.defaults.baseURL = 'http://localhost:3001'
// axios.defaults.baseURL = 'http://localhost:3001'

//VITE_CLIENT_ID=712837324982-fmpfrevk484j3ef7ee0jc7a2it17njcf.apps.googleusercontent.com
// ASÍ DEBEN CARGAR EN SU .ENV DEL FRONT

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </BrowserRouter>,
)
