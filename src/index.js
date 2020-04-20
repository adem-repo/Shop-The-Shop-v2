import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import "firebase/auth";

import './index.css';
import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyDNIbaK9g9P5lIPfI2Mjj1erIoZ_cxRAtY",
  authDomain: "foomarket-e6013.firebaseapp.com",
  databaseURL: "https://foomarket-e6013.firebaseio.com",
  projectId: "foomarket-e6013",
  storageBucket: "foomarket-e6013.appspot.com",
  messagingSenderId: "897365741751",
  appId: "1:897365741751:web:8759757706dfdbd94bfd32"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);