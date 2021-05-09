import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import { withNamespaces } from 'react-i18next';
import { NavLink, Link } from 'react-router-dom';

import instagram from '../../assets/icons/instagram.svg';
import facebook from '../../assets/icons/facebook.svg';
import gmail from '../../assets/icons/gmail.svg';
import linkedIn from '../../assets/icons/linkedin.svg';
import twitter from '../../assets/icons/twitter.svg';
import arrowDown from '../../assets/icons/arrow-down.png';

import api from '../../config/api';
import endpoints from '../../config/endpoints';

import './style.scss';
import logo from '../../assets/icons/logo.png';
import menu from '../../assets/icons/menu.png';
import close from '../../assets/icons/close.png';
import Join from '../../pages/join';

const Header = ({t, i18n}) => {
  const [data, setData] = useState([]);
  const menuRef = useRef();
  const languageRef = useRef();
  const [showLanguageChanger, setShowLanguageChanger] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showMobileSideMenu, setShowMobileSideMenu] = useState(false);
  const JOIN_MODAL_TIME = 10000;

  /**
   * Get settings data.
   * @private
   */
  const getData = async () => {
    await api
      .get(endpoints.settings)
      .then(res => setData(res.data.data));
  }

  /**
   * Toggle language. 
   * @private
   */
  const toggleLanguageChanger = () => setShowLanguageChanger(!showLanguageChanger);

  /**
   * Toggle side menu. 
   * @private
   */
  const closeSideMenu = (event) => {
    if(menuRef.current 
        && !menuRef.current.contains(event.target))
      setShowMobileSideMenu(false);

  }

  /**
   * close language changer. 
   * @private
   */
  const closeLanguageChanger = (event) => {
    if (languageRef.current && !languageRef.current.contains(event.target))
      setShowLanguageChanger(false);
  }

  /**
   * Change language.
   * @private
   */
  const changeLanguage = (lang) => {
    localStorage.setItem('lang', lang);
    i18n.changeLanguage(lang);
    const direction = lang === 'ar'
      ? 'rtl' 
      : 'lrt';
    document
      .getElementsByTagName('html')[0]
      .setAttribute("dir", direction);
    setShowLanguageChanger(!showLanguageChanger);
  }

  /**
   * Show join modal after 2 mins of opening site
   * 
   * @private
   */
  const regularJoinShow = () => {
    setTimeout(() => setShowJoinModal(true), JOIN_MODAL_TIME);
  }

  useEffect(() => {
    getData();
    regularJoinShow();
    document.addEventListener("mousedown", closeSideMenu);
    document.addEventListener("mousedown", closeLanguageChanger);

    return () => {
      document.removeEventListener("mousedown", closeSideMenu);
      document.removeEventListener("mousedown", closeLanguageChanger);
    }
  }, [window.innerWidth]);

  return (
    <div className="header-wrapper">
      <div className="head">
        <ul className="left-menu-container">
          <li 
            className="menu-item" 
            style={{
              borderLeft: i18n.language === 'ar' ? '3px solid #d4af37': 'none', 
              borderRight:i18n.language === 'ar' ? 'none': '3px solid #d4af37'
            }}
          >
            <Link className="category-link" to="/chit-chat-blog/Fashion">
              {t('fashion')}
            </Link>
          </li>
          <li 
            className="menu-item" 
            style={{
              borderLeft: i18n.language === 'ar' ? '3px solid #d4af37': 'none', 
              borderRight:i18n.language === 'ar' ? 'none': '3px solid #d4af37'
            }}
          >
            <Link className="category-link" to="/chit-chat-blog/Beauty">
              {t('beauty')}
            </Link>
          </li>
          <li 
            className="menu-item" 
            style={{
              borderLeft: i18n.language === 'ar' ? '3px solid #d4af37': 'none', 
              borderRight:i18n.language === 'ar' ? 'none': '3px solid #d4af37'
            }}
          >
            <Link className="category-link" to="/chit-chat-blog/LifeStyle">
              {t('lifeStyle')}
            </Link>
          </li>
          <li 
            className="menu-item" 
            style={{
              borderLeft: i18n.language === 'ar' ? '3px solid #d4af37': 'none', 
              borderRight:i18n.language === 'ar' ? 'none': '3px solid #d4af37'
            }}
          >
            <Link className="category-link" to="/chit-chat-blog/Womenology">
              {t('womenology')}
            </Link>
          </li>
          <li className="menu-item" style={{borderLeft: i18n.language === 'ar' ? 'none': 'none' }}>
            <Link className="category-link" to="/chit-chat-blog/Videos">
              {t('videos')}
            </Link>
          </li>
        </ul>
        <div className="language-changer-container">
          <div onClick={toggleLanguageChanger} onBlur={toggleLanguageChanger}>
          <span style={{fontSize: 20}}>{i18n.language}</span>
          <img src={arrowDown} className="change-icon" />
        </div>
        {
          showLanguageChanger &&
          <div 
            className="lang-list-container" 
            ref={languageRef}
            style={{marginBottom: window.innerWidth < '699px' ? '20px' : ''}}
          >
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
                src={linkedIn}
                className="social-icon"
              />
            </a>
          }
        </div>
      </div>
      {
        (window.innerWidth > 699) ?
          <div>
            <div className="logo">
                <Link to="/" >
                  <img 
                    src={logo}
                    className="logo-img"
                  />
                </Link>
              </div>
              <div className="nav">
                <NavLink className="link" to="/chit-chat-blog/All">
                  {t('chitChatBlog')}
                </NavLink>
                <NavLink className="link" to="/about">
                  {t('aboutUs')}
                </NavLink>
                <a className="link" href="#" onClick={() => setShowJoinModal(true)}>
                  {t('joinUs')}
                </a>
                <NavLink className="link" to="/contact">
                  {t('contactUs')}
                </NavLink>
              </div>
          </div>
        :
        // Mobile Nav bar
        <div className="logo-navbar">
          <div className="side-menu-icon">
            {
              // !showMobileSideMenu ?
                <img 
                  onClick={() => setShowMobileSideMenu(true)}
                  src={menu}
                  className="side-menu-img"
                />
                // :
                // <img 
                //   src={close}
                //   className="side-menu-img close"
                // />
            }
            <aside 
              ref={menuRef}
              className="mobile-nav"
              style = {{ 
                display: showMobileSideMenu ? 'flex' : 'none',
                padding: localStorage.getItem('lang') === 'ar' ? '15px 25px 20px 0' : '15px 0 20px 25px'
            }} 
            >
              <NavLink 
                className="link" 
                to="/chit-chat-blog/All" 
                onClick={() => setShowMobileSideMenu(false)}
              >
                {t('chitChatBlog')}
              </NavLink>
              <NavLink 
                className="link" 
                to="/about" 
                onClick={() => setShowMobileSideMenu(false)}
              >
                {t('aboutUs')}
              </NavLink>
              <a 
                className="link" 
                href="#" 
                onClick={() => {
                  setShowJoinModal(true);
                  setShowMobileSideMenu(false);
                }}
              >
                {t('joinUs')}
              </a>
              <NavLink 
                className="link" 
                to="/contact" 
                onClick={() => setShowMobileSideMenu(false)}
              >
                {t('contactUs')}
              </NavLink>
            </aside>
          </div>
          <Link to="/" >
            <img 
              src={logo}
              className="small-logo-img"
            />
          </Link>
        </div>
      }

      { showJoinModal &&  
        <Join onCloseModal={() => setShowJoinModal(!showJoinModal)} /> }
    </div>
  )
}

export default withNamespaces()(Header);