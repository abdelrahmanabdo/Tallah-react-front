import React, { useState, useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
import {NotificationManager} from 'react-notifications';
import { useParams } from 'react-router';
import moment from 'moment';
import AboutImage from '../../assets/images/about-us-image.png';

import './style.scss';
import api from '../../config/api';
import endpoints from '../../config/endpoints';
import Spinner from '../../components/spinner';
import BlogLatest from '../../components/blogLatest';
import SimpleImageSlider from "react-simple-image-slider";
import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';

function Details({i18n, t}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isCommenting, setIsCommenting] = useState(false);
  const [data, setData] = useState(null);
  const [comment, setComment] = useState({});
  const { id } = useParams();

   /**
   * Get blogs data
   * @private
   */
  const getData = async () => {
    await api.get(`${endpoints.blog}/${id}`)
            .then(res => {
              let {data} = res.data;
              if (data.images.length > 0) data.image = data.images.map((image) => image.source = image.image);
              console.log(data.images)
              setData({...data});
              setIsLoading(false);
            });
  }

  /**
   * When input value change
   * 
   * @param {String} value
   * @returns 
   * @private
   */
  const onChangeValue = (name, value) => setComment({...comment,  [name]: value});

  /**
   * Validate data
   * @private
   */
  const validate = () => {
    if (!comment.name) return NotificationManager.error(t('insertName')), false;
    if (!comment.email) return NotificationManager.error(t('insertEmail')), false;
    if (!comment.email.match(/\S+@\S+\.\S+/)) return NotificationManager.error(t('validEmail')), false;
    if (comment.website && !comment.website.match(/\S+@\S+\.\S+/)) return NotificationManager.error(t('validWebsite')), false;
    if (!comment.comment) return NotificationManager.error(t('insertComment')), false;
    let commentLength = comment.comment.split(' ').length;
    if (commentLength < 100) return NotificationManager.error(t('minimumCommentLimit')), false;
    return true;
  }

  /**
   * Submit cotnact form data
   * 
   * @private
   */
  const submitForm = async () => {
    if (!validate()) return;
    setIsCommenting(true);
    setComment({...comment, blog_id: id});
    await api.post(`${endpoints.blog}/${id}/reviews`, comment)
      .then((res) => {
        setIsCommenting(false);
        if (res.data.success) {
          NotificationManager.success('Your Comment sent successfully, Thanks');
          clearInputs();
        }
      })
      .catch((err) => {
        const {
          errors
        } = err.response.data;
        setIsCommenting(false);
        Object.keys(errors)
          .forEach(e => NotificationManager.error(errors[e][0]));
      });
  }

  const clearInputs = () => {
    Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
    Array.from(document.querySelectorAll("textarea")).forEach(input => (input.value = ""));
    setComment({});
  }

  useEffect(() => {
    // Scroll to the top of the page if mobile
    if (window.innerWidth < 799)  window.scrollTo({top: 350, behavior: 'smooth'});
    
    getData();

    return () => clearInputs();
  }, [id]);

  return (
    <div className="container details">
      {
        isLoading ?
        <Spinner />
        :
        data &&
        <>
          <div className="left"
            style = {{
              paddingRight: i18n.language === 'ar' ? 0 : '20px',
              paddingLeft: i18n.language === 'ar' ? '20px' : 0
            }}
          >
            <AwesomeSlider 
              cssModule={[AwesomeSliderStyles]}
              animation = "foldOutAnimation"
              media={data.images}
              className="mb-5"
            />
            <span className="tags">
               { 
                data.hashtags &&
                data?.hashtags.reduce((acc, cur, index, array) => 
                  acc + (i18n.language === 'ar' && cur.ar ? cur.ar : cur.en) + (index !== array.length - 1 ? ', ' : ''), '')
               }
            </span>
            <span className="title">
            { i18n.language === 'ar' && data.title_ar 
              ? data.title_ar.toUpperCase()
              : data.title.toUpperCase() }
            </span>
            <div className="blog-brief">
              <span className='section'
                style = {{
                  paddingRight: i18n.language === 'ar' ? 0 : '10px',
                  paddingLeft: i18n.language === 'ar' ? '10px' : 0
                }}
              >
                {data.user?.role_id == '3' ? 'Tallah Admin' : data.user?.name}
              </span>
              <span className="section" style={{paddingLeft: 10, borderLeft: '1px solid #CCC'}}>
                <i className="icon-message fa fa-clock-o mr-1"/> { moment(data.created_at).fromNow()}
              </span>
              {/* <span className="section" style={{paddingLeft: 10}}>
                <i className="icon-message fa fa-comment mr-1"/> {data.comments_count || 0}
              </span> */}
            </div>
            <div className="blog-body" dangerouslySetInnerHTML = {
              {
                __html: i18n.language === 'ar' && data.body_ar ?
                  data.body_ar :
                  data.body
              }
            }
            />
            <div className="comment-container">
              <h5 style={{textAlign: 'start'}}>{t('leaveComment')}</h5>
              <div className="form-header">
                < div 
                  className = "input-container"
                  style = {{
                      marginRight: i18n.language === 'ar' ? 'unset' : '14px',
                      marginLeft: i18n.language === 'ar' ? '14px' : 'unset'
                    }} 
                >
                  <label className="form-title">
                    {t('name')} *
                  </label>
                  <input 
                    onChange={(v) => onChangeValue('name', v.target.value)}
                    value={comment.name}
                    className="form-input"
                    rows={7}
                  />
                </div>
                <div 
                  className = "input-container"
                  style = {{
                      marginRight: i18n.language === 'ar' ? 'unset' : '14px',
                      marginLeft: i18n.language === 'ar' ? '14px' : 'unset'
                    }} 
                >
                  <label className="form-title">
                    {t('email')} *
                  </label>
                  <input 
                    onChange={(v) => onChangeValue('email', v.target.value)}
                    value={comment.email}
                    className="form-input"
                    rows={7}
                  />
                </div>
                <div className="input-container">
                  <label className="form-title">
                    {t('website')}
                  </label>
                  <input 
                    onChange={(v) => onChangeValue('website', v.target.value)}
                    value={comment.website}
                    className="form-input"
                    rows={7}
                  />
                </div>
              </div>
              <div className="input-container">
                <label className="form-title">
                  {t('comment')} *
                </label>
                <textarea 
                  onChange={(v) => onChangeValue('comment', v.target.value)}
                  value={comment.comment}
                  className="form-input"
                  rows={9}
                >
                </textarea>
                <button 
                  onClick={submitForm}
                  disabled={isCommenting}
                  className="form-button mt-4 col-md-4 col-sm-12 bg-secondary">
                  {t('submitComment')}
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

export default withNamespaces()(Details);
