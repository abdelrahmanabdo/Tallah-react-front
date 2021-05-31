import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import api from '../../config/api';
import endpoints from '../../config/endpoints';
import Image from '../../assets/images/about-us-image.png';
import './style.scss';

function BlogLatest({t, i18n}) {
  const [data, setData] = useState([]);

  /**
   * Get blogs data
   * @private
   */
  const getData = async () => {
    await api.get(endpoints.blog + '?latest=true')
      .then(res => setData(res.data.data));
  }

  useEffect(() => {
   getData();
  }, []);

  return (
    <div className="latest-container">
      {/* <div className="search-container">
        <input 
          className="search-input"
          type="text"
          placeholder={t('searchHere')}
        />
        <Link to="#" className='search-button'>
          <i className="fa fa-search" />
        </Link>
      </div> */}
      {
        data.length > 0 &&
        <div className="latest-blogs-container">
          <div className="header">
            {t('latestPosts')}
          </div>
          <div className="list">
            {
              data.map((blog) => {
                return <div 
                  className="blog-item" 
                  key={blog.id}
                  >
                  <Link 
                    className="blog-image" 
                    to={"/chit-chat/details/" + blog.id}
                    style={{marginLeft: i18n.language === 'ar' ? '10px' : '0px'}}
                  >
                    <img className="image"  src={blog.image ? blog.image.image : Image} alt="img" />
                  </Link>
                  <div className="blog-data">
                    <Link to={"/chit-chat/details/" + blog.id} className="title mb-2">
                     {
                       i18n.language === 'ar' && blog.title_ar ?
                         blog.title_ar :
                         blog.title
                     }
                    </Link>
                    <div 
                          className = "text"
                          dangerouslySetInnerHTML = {{
                            __html: (i18n?.language === 'ar' && blog.body_ar) ?
                                    blog.body_ar.substring(0, 30) : blog.body.substring(0, 30)
                          }}
                        />
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