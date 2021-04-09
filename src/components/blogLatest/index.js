import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import api from '../../config/api';
import endpoints from '../../config/endpoints';
import Image from '../../assets/images/about-us-image.png';
import './style.scss';

function BlogLatest({t}) {
  const [data, setData] = useState([]);

  /**
   * Get blogs data
   * @private
   */
  const getData = async () => {
    await api.get(endpoints.blog + '?latest')
      .then(res => setData(res.data.data));
  }

  useEffect(() => {
   getData();
  }, []);

  return (
    <div className="latest-container">
      <div className="search-container">
        <input 
          className="search-input"
          type="text"
          placeholder={t('searchHere')}
        />
        <Link to="#" className='search-button'>
          <i className="fa fa-search" />
        </Link>
      </div>
      {
        data.length > 0 &&
        <div className="latest-blogs-container">
          <div className="header">
            {t('latestPosts')}
          </div>
          <div className="list">
            {
              data.map((blog) => {
                return <div className="blog-item" key={blog.id}>
                  <Link className="blog-image" to={"/chic-chat/details/" + blog.id}>
                    <img className="image"  src={blog.image ? blog.image.image : Image} />
                  </Link>
                  <div className="blog-data">
                    <Link to={"/chic-chat/details/" + blog.id} className="title">
                     {blog.title}
                    </Link>
                    <span>
                      {blog.body.substring(0 ,30)}
                    </span>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      }
    </div>
  )
}

export default withNamespaces()(BlogLatest);