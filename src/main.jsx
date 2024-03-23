import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Redux/store.js';
import axios from 'axios';

axios.defaults.baseURL = 'https://back-bosco.up.railway.app/'
// axios.defaults.baseURL = 'http://localhost:3001'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />

    </Provider>
  </BrowserRouter>,
)
