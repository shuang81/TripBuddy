import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './pages/App';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { IKContext } from 'imagekitio-react'; // for using image upload
import {AuthContextProvider} from './context/authContext';
import axios from 'axios';

const IMAGE_UPLOAD_URL = process.env.REACT_APP_IMAGE_KIT_URL
const IMAGE_UPLOAD_KEY = process.env.REACT_APP_IMAGE_KIT_PUBLIC_KEY;
const AUTH_ENPOINT = `${process.env.REACT_APP_SERVER_URL}/user/auth`

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
    <AuthContextProvider>
      <IKContext urlEndpoint={IMAGE_UPLOAD_URL} publicKey={IMAGE_UPLOAD_KEY} authenticationEndpoint={AUTH_ENPOINT}>
        <App />
      </IKContext>
      </AuthContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);
