import React, { useState, useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
import { NavLink, Link } from 'react-router-dom';

import instagram from '../../assets/icons/instagram.svg';
import facebook from '../../assets/icons/facebook.svg';
import gmail from '../../assets/icons/gmail.svg';
import linkedin from '../../assets/icons/linkedin.svg';
import twitter from '../../assets/icons/twitter.svg';
import arrowDown from '../../assets/icons/arrow-down.png';

import api from '../../config/api';
import endpoints from '../../config/endpoints';

import './style.scss';
import logo from '../../logo.png';

const Header = ({t, i18n}) => {
  const [data, setData] = useState([]);
  const [showLanguageChanger, setShowLanguageChanger] = useState(false);

  /**
   * Get settings data
   * @private
   */
  const getData = async () => {
    await api
      .get(endpoints.settings)
      .then(res => setData(res.data.data));
  }

  /**
   * Toggle language changer 
   * @private
   */
  const toggleLanguageChanger = () => setShowLanguageChanger(!showLanguageChanger);

  /**
   * Change language
   * @private
   */
  const changeLanguage = (lang) => {
    localStorage.setItem('lang', lang);
    i18n.changeLanguage(lang);
    const direction = lang === 'ar' ? 'rtl' : 'lrt';
    document
      .getElementsByTagName('html')[0]
      .setAttribute("dir", direction);
    setShowLanguageChanger(!showLanguageChanger);
  }

  useEffect(() => getData(), []);

  return (
    <div className="header-wrapper">
      <div className="head">
        <ul className="left-menu-container">
          <li className="menu-item">
            <Link className="category-link" to="/chic-chat-blog/Fashion">
              {t('fashion')}
            </Link>
          </li>
          <li className="menu-item">
            <Link className="category-link" to="/chic-chat-blog/Beauty">
              {t('beauty')}
            </Link>
          </li>
          <li className="menu-item">
            <Link className="category-link" to="/chic-chat-blog/LifeStyle">
              {t('lifeStyle')}
            </Link>
          </li>
          <li className="menu-item">
            <Link className="category-link" to="/chic-chat-blog/Womenology">
              {t('womenology')}
            </Link>
          </li>
          <li className="menu-item">
            <Link className="category-link" to="/chic-chat-blog/Videos">
              {t('videos')}
            </Link>
          </li>
        </ul>
        <div className="social-container">
          {
            (data && data.twitter_url ) &&
              <a  href={data?.twitter_url} className="social-link">
              <img 
                src={twitter}
                className="social-icon"
              />
            </a>
          }
          {
            (data && data.instagram_url) &&
            <a href={data?.instagram_url} className="social-link">
              <img 
                src={instagram}
                className="social-icon"
              />
            </a>
          }
          {
            (data && data.facebook_url) &&
            <a href={data?.facebook_url} className="social-link">
              <img 
                src={facebook}
                className="social-icon"
              />
            </a>
          }
          {
            (data && data.google_url) &&
            <a href={data?.google_url} className="social-link">
              <img 
                src={gmail}
                className="social-icon"
              />
            </a>
          }
          {
            (data && data.linkedIn_url) &&
            <a href={data?.linkedIn_url} className="social-link">
              <img 
                src={linkedin}
                className="social-icon"
              />
            </a>
          }
        </div>
      </div>
      <div className="logo">
        <Link to="/" >
          <img 
            src={logo}
            className="logo-img"
          />
        </Link>
        <div className="language-changer-container">
          <div onClick={toggleLanguageChanger} onBlur={toggleLanguageChanger}>
            <span>{i18n.language}</span>
            <img src={arrowDown} className="change-icon" />
          </div>
          {
            showLanguageChanger &&
            <div className="lang-list-container">
              <ul className="lang-list">
                <li 
                  className="lang-list-item" 
                  className={localStorage.getItem('lang') === 'ar' ? 'active': ''}  
                  onClick={() => changeLanguage('ar')}>
                  العربية
                </li>
                <li 
                  className="lang-list-item" 
                  className={localStorage.getItem('lang') === 'en' ? 'active': ''}  
                  onClick={() => changeLanguage('en')}
                >
                  English
                </li>
              </ul>
            </div>
          }
        </div>
      </div>

      <div className="nav">
        <NavLink className="link" to="/chic-chat-blog/All">
          {t('chicChatBlog')}
        </NavLink>
        <NavLink className="link" to="/about">
           {t('aboutUs')}
        </NavLink>
        <NavLink className="link" to="/join">
          {t('joinUs')}
        </NavLink>
        <NavLink className="link" to="/contact">
          {t('contactUs')}
        </NavLink>
      </div>
    </div>
  )
}

export default withNamespaces()(Header);