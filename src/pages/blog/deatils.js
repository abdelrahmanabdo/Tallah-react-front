import React, { useState, useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
import {NotificationManager} from 'react-notifications';
import { useParams } from 'react-router';
import moment from 'moment';
import {
  ShareSocial
} from 'react-share-social'
import {Helmet} from "react-helmet";

import './style.scss';
import api from '../../config/api';
import endpoints from '../../config/endpoints';
import Spinner from '../../components/spinner';
import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';

function Details({i18n, t}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isCommenting, setIsCommenting] = useState(false);
  const [data, setData] = useState(null);
  const [comment, setComment] = useState({});
  const { slug } = useParams();
  const pageUrl = window.location.href;

   /**
   * Get blogs data
   * @private
   */
  const getData = async () => {
    console.log('slug', slug)
    await api.get(`${endpoints.blog}/details/${slug}`)
            .then(res => {
              let {data} = res.data;
              if (data?.images?.length > 0) 
                data.image = data.images.map((image) => image.source = image.image);
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
    if (comment.website && !comment.website.match(/\S\.\S+/)) return NotificationManager.error(t('validWebsite')), false;
    if (!comment.comment) return NotificationManager.error(t('insertComment')), false;
    let commentLength = comment.comment.split(' ').length;
    if (commentLength < 4) return NotificationManager.error(t('minimumCommentLimit')), false;
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
    setComment({...comment, blog_id: data.id});
    await api.post(`${endpoints.blog}/${data.id}/reviews`, comment)
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
    console.log(window.location.href)
    getData();

    return () => clearInputs();
  }, [slug]);

  return (
    <div className="container details">
      <Helmet>
        <link rel="canonical" href={window.location.href} />
        <title>{data?.meta_title || data?.title}</title>
        <meta name="description" content={i18n.language === 'ar' ? (data?.meta_description_ar) : (data?.meta_description)} />
        <meta property="og:title" content={i18n.language === 'ar' ? (data?.meta_title_ar) : (data?.meta_title)} />
        <meta property="og:description" content={i18n.language === 'ar' ? (data?.meta_description_ar) : (data?.meta_description)} />
        <meta property="og:image" content={data?.images && data?.images.length > 0 
            ? data.images[0].image
            : 'https://tallah.co/logo.png'
          }
        />
      </Helmet>
      {
        isLoading ?
        <Spinner />
        :
        data &&
        <div className="page-content">
          <div className="left-side">
            <div className="search-input-container">
              <h5>
                {t('search')}
              </h5>
              <input
                className="search-input"
                type='text'
                placeholder={t('search')}
              />
            </div>
            <hr />
            <div className="categories-container">
              <h5 className="mb-3">
                {t('category')}
              </h5>
              <div className="category-row">
                <span>{t('fashion')}</span>
                <input 
                  type="checkbox"
                  name="Fashion"
                />
              </div>
              <div className="category-row">
                <span>{t('beauty')}</span>
                <input 
                  type="checkbox"
                  name="Fashion"
                />
              </div>
              <div className="category-row">
                <span>{t('lifeStyle')}</span>
                <input 
                  type="checkbox"
                  name="Fashion"
                />
              </div>
              <div className="category-row">
                <span>{t('womenology')}</span>
                <input 
                  type="checkbox"
                  name="Fashion"
                />
              </div>
              <div className="category-row">
                <span>{t('videos')}</span>
                <input 
                  type="checkbox"
                  name="Fashion"
                />
              </div>
            </div>
            <hr />
            <div className="connect-us-container">
              <h5>
                {t('connectUs')}
              </h5>
              <input
                className="connect-input mt-3"
                type='text'
                placeholder={t('name')}
              />
              <input
                className="connect-input mt-2"
                type='text'
                placeholder={t('emailAddress')}
              />
            </div>
          </div>
          <div className="right-side">
            <AwesomeSlider 
              cssModule={[AwesomeSliderStyles]}
              animation = "foldOutAnimation"
              media={data.images}
              className="mb-5"
            />
            <div className="blog-brief">
              <span className='section text-underline'>
                By {data.user?.role_id == '3' ? 'Tallah' : data.user?.name}
              </span>
              <span className="section mx-4">
                <i className="icon-message fa fa-clock-o mr-1"/> 
                { moment(data.created_at).fromNow()}
              </span>
            </div>
            <div className="title-wrapper">
              <span className="title-text">
                { (i18n.language === 'ar' && data.title_ar) || (data.title_ar && !data.title)
                    ? data.title_ar.toUpperCase()
                    : data.title.toUpperCase() 
                }
              </span>
            </div>
            <div className="blog-body" dangerouslySetInnerHTML = {
                {
                  __html: (i18n.language === 'ar' && data.body_ar) || (data.body_ar && !data.body)
                    ? data.body_ar
                    : data.body
                }
              }
            />
            <ShareSocial 
              style = {{
                padding: 0
              }}
              // title={'share'}
              url={pageUrl}
              socialTypes = {
                ['facebook', 'twitter', 'linkedin']
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
                  className="form-button mt-4 col-md-2 col-sm-12">
                  {t('submitComment')}
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default withNamespaces()(Details);
