import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './style.scss';
import { withNamespaces } from 'react-i18next';

import api from '../../config/api';
import endpoints from '../../config/endpoints';

import Image from '../../assets/images/about-us-image.png';

function Slider({i18n, t}) {

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
        setCurrentBlog(res.data.data[0]);
        // setTimeout(changeActiveBlog(res.data.data[0].id), 2000);
      });
  }

  /**
   * on Select blog
   */
  const onSelectBlogToReview = (blog) => setCurrentBlog(blog)


  /**
   * Change active blog
   */
  const changeActiveBlog = (currentBlogId) => {
    console.log(data)
    let currentIndex = data.findIndex((blog) => blog.id == currentBlogId);
    console.log(currentIndex)
    setCurrentBlog(data[currentIndex + 1]);
  }

  useEffect(() => {
    getData();
  }, []);

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
          <div className="blog-details">
            <span className="title">
              {
                i18n.language === 'ar' && currentBlog.title_ar ?
                  currentBlog.title_ar:
                  currentBlog.title
              }
            </span>
            <p className="text" dangerouslySetInnerHTML = {
                {
                  __html: (i18n.language === 'ar' && currentBlog.body_ar) || (currentBlog.body_ar && !currentBlog.body)
                    ? currentBlog.body_ar
                    : currentBlog.body
                }
              }
            />
            <Link className = "continue-reading-button"
              to = {currentBlog.slug ? currentBlog.slug : currentBlog.title} 
            >
              {t('continueReading')}
            </Link>
          </div>
          <div className="carousel-dots-container">
           { data.map((blog) => <span
              key={blog.id}
              onClick={() => onSelectBlogToReview(blog)}
              className={blog.id === currentBlog.id ? 'dot active' : 'dot'} 
            />) 
          }
          </div>
        </div>
      }
    </>
  )
}

export default withNamespaces()(Slider);
