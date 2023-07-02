import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import LoadingSpinner from './components/LoadingView/LoadingView.jsx';

import { ConfigProvider } from './contexts/ConfigContext';
import { ToastContainer } from 'react-toastify';

import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';

import axios from 'axios';

import './index.css'
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = import.meta.env.VITE_APIENDPOINT || "http://localhost:3500/api";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <ConfigProvider>
              <UserContextProvider>
                  <App/>
                  <ToastContainer theme='dark' position='bottom-right' />
                  <LoadingSpinner />
              </UserContextProvider>
          </ConfigProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
