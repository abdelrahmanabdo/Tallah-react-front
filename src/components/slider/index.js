import React, { useState, useEffect } from 'react'

import api from '../../config/api';
import endpoints from '../../config/endpoints';

import './style.scss';
import Image from '../../assets/images/about-us-image.png';
import { Link } from 'react-router-dom';

export default function Slider() {
  const [data, setData] = useState(null);
  const [currentBlog, setCurrentBlog] = useState({});

  /**
   * Get blogs data
   * @private
   */
  const getData = async () => {
    await api.get(endpoints.blog + '?featured')
      .then(res => {
        setData(res.data.data);
        setCurrentBlog(res.data.data[0])
      });
  }

  /**
   * on Select blog
   */
  const onSelectBlogToReview = (blog) => {
    setCurrentBlog(blog)
  }

  useEffect(() => {
   getData();
  }, []);

  return (
    <>
      {
        data &&
        <div 
          className="container slider" 
          style={{backgroundImage: `url(${currentBlog.image?.image ?? Image})`, backgroundRepeat: 'no-repeat'}}
        >
          <div className="left-blogs">
            {
              data.map((blog) =>  <img 
                className="blog-item" 
                src={blog.image ? blog.image.image : Image} 
                onClick={() => onSelectBlogToReview(blog)} 
              />)
            }
          </div>
          <div className="blog-details">
            <span className="tags">
              Fashion, LifeStyle, Womenology
            </span>
            <span className="title">
              {currentBlog.title}
            </span>
            <p className="text">
              {currentBlog.body}
            </p>
            <Link className="continue-reading-button" to={'/chic-chat/details/' + currentBlog.id}>
              Continue Reading
            </Link>
          </div>
        </div>
      }
    </>
  )
}
