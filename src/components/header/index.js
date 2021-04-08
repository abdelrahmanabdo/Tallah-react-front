import React, { useState, useEffect } from 'react';

import { NavLink, Link } from 'react-router-dom';

import instagram from '../../assets/icons/instagram.svg';
import facebook from '../../assets/icons/facebook.svg';
import gmail from '../../assets/icons/gmail.svg';
import linkedin from '../../assets/icons/linkedin.svg';

import api from '../../config/api';
import endpoints from '../../config/endpoints';

import './style.css';
import logo from '../../logo.png';

export default function Header() {

  const [data, setData] = useState([]);

  /**
   * Get settings data
   * @private
   */
  const getData = async () => {
    await api
      .get(endpoints.settings)
      .then(res => setData(res.data.data));
  }

  useEffect(() => getData(), []);

  return (
    <div className="header-wrapper">
      <div className="head">
        <ul className="left-menu-container">
          <li className="menu-item">
            <Link className="category-link" to="/chic-chat-blog/Fashion">
              Fashion
            </Link>
          </li>
          <li className="menu-item">
            <Link className="category-link" to="/chic-chat-blog/Beauty">
              Beauty
            </Link>
          </li>
          <li className="menu-item">
            <Link className="category-link" to="/chic-chat-blog/LifeStyle">
              LifeStyle
            </Link>
          </li>
          <li className="menu-item">
            <Link className="category-link" to="/chic-chat-blog/Womenology">
              Womenology
            </Link>
          </li>
          <li className="menu-item">
            <Link className="category-link" to="/chic-chat-blog/Videos">
              Videos
            </Link>
          </li>
        </ul>
        <div className="social-container">
          <a href={data?.instagram_url} className="social-link">
            <img 
              src={instagram}
              className="social-icon"
            />
          </a>
          <a href={data?.facebook_url} className="social-link">
            <img 
              src={facebook}
              className="social-icon"
            />
          </a>
          <a href={data?.google_url} className="social-link">
            <img 
              src={gmail}
              className="social-icon"
            />
          </a>
          <a href={data?.linkedIn_url} className="social-link">
            <img 
              src={linkedin}
              className="social-icon"
            />
          </a>
        </div>
      </div>
      <Link to="/" className="logo">
        <img 
          src={logo}
          className="logo-img"
        />
      </Link>
      <div className="nav">
        <NavLink className="link" to="/chic-chat-blog/All">
          Chic chat blog
        </NavLink>
        <NavLink className="link" to="/about">
          About Us
        </NavLink>
        <NavLink className="link" to="/join">
          Join our chat
        </NavLink>
        <NavLink className="link" to="/contact">
          Contact Us
        </NavLink>
      </div>
    </div>
  )
}
