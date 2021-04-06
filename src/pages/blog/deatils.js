import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import moment from 'moment';
import AboutImage from '../../assets/images/about-us-image.png';

import './style.scss';
import api from '../../config/api';
import endpoints from '../../config/endpoints';
import Spinner from '../../components/spinner';
import BlogLatest from '../../components/blogLatest';

export default function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const { id } = useParams();

   /**
   * Get blogs data
   * @private
   */
  const getData = async () => {
    await api.get(`${endpoints.blog}/${id}`)
            .then(res => setData({...res.data.data}), setIsLoading(false));
  }

  /**
   * When input value change
   * 
   * @param {String} value
   * @returns 
   * @private
   */
  const onChangeValue = (name, value) => {
    setData({...data,  [name]: value})
  }

  useEffect(() => getData(), [id]);

  return (
    <div className="container details">
      {
        isLoading ?
        <Spinner />
        :
        data &&
        <>
          <div className="left">
            <img src={data.images.length ? data.images[0].image : AboutImage} className="blog-image" />
            <span className="tags">
              {data.hashtags?.reduce((acc, curr) => `${acc} ${curr.toUpperCase()}, `, '')}
            </span>
            <span className="title">
              {data.title?.toUpperCase()}
            </span>
            <div className="blog-brief">
              <span className="section" style={{paddingRight: 10, borderRight: '1px solid #CCC'}}>
                <i className="icon-message fa fa-clock-o mr-1"/> { moment(data.created_at).fromNow()}
              </span>
              <span className="section" style={{paddingLeft: 10}}>
                <i className="icon-message fa fa-comment mr-1"/> {data.comments_count || 0}
              </span>
            </div>
            <p html className="blog-body">
              {data?.body}
            </p>
            <div className="comment-container">
              <h5>Leave Comment</h5>
              <div className="form-header">
                <div className="input-container">
                  <label className="form-title">
                    Name *
                  </label>
                  <input 
                    onChange={(v) => onChangeValue('message', v.target.value)}
                    value={data.message}
                    className="form-input"
                    rows={7}
                  />
                </div>
                <div className="input-container">
                  <label className="form-title">
                    Email *
                  </label>
                  <input 
                    onChange={(v) => onChangeValue('message', v.target.value)}
                    value={data.message}
                    className="form-input"
                    rows={7}
                  />
                </div>
                <div className="input-container">
                  <label className="form-title">
                    Website
                  </label>
                  <input 
                    onChange={(v) => onChangeValue('message', v.target.value)}
                    value={data.message}
                    className="form-input"
                    rows={7}
                  />
                </div>
              </div>
              <div className="input-container">
                <label className="form-title">
                  Comment *
                </label>
                <textarea 
                  onChange={(v) => onChangeValue('message', v.target.value)}
                  value={data.message}
                  className="form-input"
                  rows={9}
                >
                </textarea>
                <button className="form-button mt-4 col-md-4 col-sm-12  bg-secondary">
                  Submit Comment
                </button>
              </div>
            </div>
          </div>
          <div className="right">
            <BlogLatest />
          </div>
        </>
      }
    </div>
  )
}
