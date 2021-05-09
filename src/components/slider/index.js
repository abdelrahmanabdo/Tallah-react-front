import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './style.scss';

import api from '../../config/api';
import endpoints from '../../config/endpoints';

import Image from '../../assets/images/about-us-image.png';

export default function Slider() {
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

  const changeSliderActiveImage = () => {
        console.log('currentBlog', currentBlog)
        console.log('data', data)

        const currentIndex = data.findIndex((blog) => blog.id === currentBlog.id);
        console.log(currentIndex)
        setCurrentBlog(currentIndex == data.length ? data[0] : data[currentIndex]);
  }

  // const timer = () => setInterval(changeSliderActiveImage, 10000);

  /**
   * on Select blog
   */
  const onSelectBlogToReview = (blog) => setCurrentBlog(blog)

  useEffect(() => {
    getData();
    // return () => clearInterval(timer);
  }, []);

  return (
    <>
      {
        data &&
        <div 
          className="container slider" 
          style = {{
              backgroundImage: `url(${currentBlog.image?.image ?? Image})`,
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
                { currentBlog.hashtags?.reduce((acc, cur, index, array) => acc + cur.toUpperCase() + (index !== array.length - 1 ? ', ' : ''), '') }
              </span>
            }
            <span className="title">
              {currentBlog.title}
            </span>
            <p className="text">
              {currentBlog.body}
            </p>
            <Link className="continue-reading-button" to={'/chit-chat/details/' + currentBlog.id}>
              Continue Reading
            </Link>
          </div>
        </div>
      }
    </>
  )
}
