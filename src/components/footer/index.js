import React, { useState, useEffect } from 'react';
import { withNamespaces } from 'react-i18next';

import instagram from '../../assets/icons/instagram-footer.png';
import facebook from '../../assets/icons/fb-footer.png';
import gmail from '../../assets/icons/gmail-footer.png';
import { Link } from 'react-router-dom';
import api from '../../config/api';
import endpoints from '../../config/endpoints';

import './style.scss';


const  Footer = ({t}) => {
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
    <div className="footer-wrapper">
      <div className="head-container">
        <a href={data?.instagram_url} className="social-link">
          <img src={instagram} className="social-icon" />
        </a>
        <a href={data?.facebook_url} className="social-link">
          <img src={facebook} className="social-icon" />
        </a>
        <a href={data?.google_url} className="social-link">
          <img src={gmail} className="social-icon" />
        </a>
      </div>
      <div className="content">
        {/* <div className="menu-list">
          <span className="list-title">Archive</span>
          <ul className="menu-items">
            <Link className="list-item">
                May 2020
            </Link>
            <Link className="list-item">
                May 2020
            </Link>
            <Link className="list-item">
                May 2020
            </Link>
          </ul>
        </div> */}
        <div className="menu-list">
          <span className="list-title">{t('categories')}</span>
          <ul className="menu-items">
            <Link to="/chit-chat-blog/Fashion"  className="list-item">
                 {t('fashion')}
            </Link>
            <Link to="/chit-chat-blog/Beauty" className="list-item">
                {t('beauty')}
            </Link>
            <Link to="/chit-chat-blog/LifeStyle"  className="list-item">
                 {t('lifeStyle')}
            </Link>
            <Link to="/chit-chat-blog/Womenology"  className="list-item">
                {t('womenology')}
            </Link>
            <Link to="/chit-chat-blog/Videos"  className="list-item">  
                {t('videos')}
            </Link>
          </ul>
        </div>
        <div className="menu-list">
          <span className="list-title">{t('contactInfo')}</span>
          <ul className="menu-items">
            <a className="list-item mb-3">
               <i className="fa fa-map mr-2" />  {data?.address}
            </a>
            <a className="list-item mb-3">
               <i className="fa fa-phone mr-2"/> {t('phone')} {data?.phone_number}
            </a>
            <a className="list-item" href={'mailto:'+ data?.email}>
               <i className="fa fa-envelope mr-2" /> {t('email')}  {data?.email}
            </a>
          </ul>
        </div>
      </div>
      <div className="foot-container">
        <span>
          © Copyright 2021 {data?.site_url || 'Tallah'}
        </span>
        {/* <ul className="social-list">
          <a href={data?.twitter_url} className="social-list-item">
            <i className="fa fa-twitter" />
          </a>
          <a href={data?.instagram_url} className="social-list-item">
            <i className="fa fa-instagram" />
          </a>
          <a href={data?.linkedIn_url} className="social-list-item">
            <i className="fa fa-linkedin" />
          </a>
          <a href={data?.facebook_url} className="social-list-item">
            <i className="fa fa-facebook" />
          </a>
        </ul> */}
      </div>
    </div>
  )
}

export default withNamespaces()(Footer);
