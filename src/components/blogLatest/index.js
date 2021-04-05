import React from 'react'
import { Link } from 'react-router-dom';
import './style.scss';

export default function BlogLatest() {
  return (
    <div className="latest-container">
      <div className="search-container">
        <input 
          className="search-input"
          type="text"
          placeholder="Search here...."
        />
        <Link to="#" className='search-button'>
          <i className="fa fa-search" />
        </Link>
      </div>
      <div className="latest-blogs-container">
        <div className="header">
          Latest Posts
        </div>
        <div className="list">
          <div className="blog-item">
            <Link className="blog-image" to="/chic-chat/details">
              <img 
                srs='https://secureservercdn.net/45.40.149.181/301.254.myftpupload.com/wp-content/uploads/2020/05/ways-save-money-vacation-1068x713-1-180x138.jpg' 
                className="image"
              />
            </Link>
            <div className="blog-data">
              <Link to="/chic-chat/details">
                Hair style
              </Link>
              <span>Hair style</span>
            </div>
          </div>
          <div className="blog-item">
            <Link className="blog-image" to="/chic-chat/details">
              <img 
                srs='https://secureservercdn.net/45.40.149.181/301.254.myftpupload.com/wp-content/uploads/2020/05/ways-save-money-vacation-1068x713-1-180x138.jpg' 
                className="image"
              />
            </Link>
            <div className="blog-data">
              <Link to="/chic-chat/details" className="title">
                Hair style
              </Link>
              <span>
                Hair style
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
