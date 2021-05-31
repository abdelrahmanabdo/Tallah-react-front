import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './style.scss';
import { withNamespaces } from 'react-i18next';

import api from '../../config/api';
import endpoints from '../../config/endpoints';

import Image from '../../assets/images/about-us-image.png';

function Slider({i18n}) {

  const [data, setData] = useState([]);
  const [currentBlog, setCurrentBlog] = useState({});

  /**
   * Get blogs data
   * @private
   */
  const getData = async () => {
    await api.get(endpoints.blog + '?featured=true')
      .then(res => {
        setData(res.data.data);
        setCurrentBlog(res.data.data[0])
      });
  }

  /**
   * on Select blog
   */
  const onSelectBlogToReview = (blog) => setCurrentBlog(blog)

  useEffect(() => getData(), []);

  return (
    <>
      {
        (data && data.length > 0) &&
        <div 
          className="container slider" 
          style = {{
              backgroundImage: `url(${currentBlog?.image?.image ?? Image})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }}
        >
          <div className="left-blogs">
            {
              data.map((blog) =>  <img 
                className="blog-item" 
                key={blog.id}
                src={blog.image ? blog.image.image : Image} 
                onClick={() => onSelectBlogToReview(blog)} 
              />)
            }
          </div>
          <div className="blog-details">
            {
              currentBlog.hashtags &&
              <span className="tags">
                { currentBlog.hashtags?.reduce((acc, cur, index, array) =>
                  acc + (i18n.language === 'ar' && cur.ar ? cur.ar : cur.en) + (index !== array.length - 1 ? ', ' : ''), '')
                }
              </span>
            }
            <span className="title">
              {
                i18n.language === 'ar' && currentBlog.title_ar ?
                  currentBlog.title_ar:
                  currentBlog.title
              }
            </span>
            <div 
                className = "text"
                dangerouslySetInnerHTML = {{
                  __html: (i18n.language === 'ar' && currentBlog.body_ar) ?
                          currentBlog.body_ar: currentBlog.body
                }}
              />
            <Link className="continue-reading-button" to={'/chit-chat/details/' + currentBlog.id}>
              Continue Reading
            </Link>
          </div>
        </div>
      }
    </>
  )
}

export default withNamespaces()(Slider);
