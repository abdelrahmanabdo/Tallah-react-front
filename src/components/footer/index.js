import React from 'react';
import './style.css';
import instagram from '../../assets/icons/instagram-footer.png';
import facebook from '../../assets/icons/fb-footer.png';
import gmail from '../../assets/icons/gmail-footer.png';

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="head-container">
        <a href="#" className="social-link">
          <img src={instagram} className="social-icon" />
        </a>
        <a href="#" className="social-link">
          <img src={facebook} className="social-icon" />
        </a>
        <a href="#" className="social-link">
          <img src={gmail} className="social-icon" />
        </a>
      </div>
      <div className="content">
        <div className="menu-list">
          <span className="list-title">Archive</span>
          <ul className="menu-items">
            <li className="list-item">
              <a href="#">
                May 2020
              </a>
            </li>
            <li className="list-item">
              <a href="#">
                May 2020
              </a>
            </li>
            <li className="list-item">
              <a href="#">
                May 2020
              </a>
            </li>
          </ul>
        </div>
        <div className="menu-list">
          <span className="list-title">Categories</span>
          <ul className="menu-items">
            <li className="list-item">
              <a href="#">
                Beauty
              </a>
            </li>
            <li className="list-item">
              <a href="#">
                Fashion
              </a>
            </li>
            <li className="list-item">
              <a href="#">
                LifeStyle
              </a>
            </li>
            <li className="list-item">
             <a href="#">
                Womenology
              </a>
            </li>
            <li className="list-item">  
             <a href="#">
                Videos
              </a>
            </li>
          </ul>
        </div>
        <div className="menu-list">
          <span className="list-title">Contact Info</span>
          <ul className="menu-items">
            <li className="list-item mb-3">
              <a href="#">
               <i className="fa fa-map mr-2" />  72, Lorem ipsum dolor sit consectetur adipiscing elit, sed do eiusmod tempor incididunt
              </a>
            </li>
            <li className="list-item mb-3">
              <a href="#">
               <i className="fa fa-phone mr-2" /> Phone: (111) 211 - 2222
              </a>
            </li>
            <li className="list-item">
              <a href="#">
               <i className="fa fa-envelope mr-2" /> Email: dev.abdelrahman
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="foot-container">
        <span>
          © Copyright 2021 Tallah
        </span>
        <ul className="social-list">
          <li className="social-list-item">
            <i className="fa fa-twitter" />
          </li>
          <li className="social-list-item">
            <i className="fa fa-instagram" />
          </li>
          <li className="social-list-item">
            <i className="fa fa-linkedin" />
          </li>
          <li className="social-list-item">
            <i className="fa fa-facebook" />
          </li>
        </ul>
      </div>
    </div>
  )
};
