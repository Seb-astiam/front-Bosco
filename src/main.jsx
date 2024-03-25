import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Redux/store.js';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID= "712837324982-fmpfrevk484j3ef7ee0jc7a2it17njcf.apps.googleusercontent.com"
// NO SUPE HACER EL .ENV, VA A IR EN LA PROX ACTUALIZACIÓN JAJA NO ME ROBEN LOS DATOS

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </BrowserRouter>,
)
