import React from 'react';
import {NotificationContainer} from 'react-notifications';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-notifications/lib/notifications.css';
import i18n  from  './i18n';
import ReactGA from 'react-ga';

// Language Handling
const currentLang = localStorage.getItem('lang') || 'en';
localStorage.setItem('lang', currentLang);
i18n.changeLanguage(currentLang);
const direction = currentLang === 'ar' ?
  'rtl' :
  'ltr';
document
  .getElementsByTagName('html')[0]
  .setAttribute("dir", direction);

// Google Analytics 
ReactGA.initialize('G-FQ6G8HWPLD');

ReactDOM.render(
  <>
    <App />
    <NotificationContainer/>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
