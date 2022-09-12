import React, { useState } from 'react';
import { withNamespaces } from 'react-i18next';
import {NotificationManager} from 'react-notifications';

import api from '../../config/api';
import endpoints from '../../config/endpoints';

import './style.scss';

const Join = ({onCloseModal, t}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [type, setType] = useState('largeBox');

  /**
   * When input value change
   * 
   * @param {String} value
   * @returns 
   * @private
   */
  const onChangeValue = (name, value) => {
    setData({
      ...data,
      [name]: value
    })
  }

  /**
   * Validate data
   * @private
   */
  const validate = () => {
    if (!data.email) 
      return NotificationManager.error(t('insertEmail')), false;
    if (!data.email.match(/\S+@\S+\.\S+/)) 
      return NotificationManager.error(t('validEmail')), false;
    if (!data.email.includes('@') || !data.email.includes('.')) 
      return NotificationManager.error('Please insert Valid E-mail'), false;
    return true;
  }

  /**
   * Submit Join form data
   * 
   * @private
   */
  const submitForm = async () => {
    if (!validate()) return;
    setIsLoading(true);
    await api.post(endpoints.subscription, data)
      .then((res) => {
        setIsLoading(false);
        if (res.data.success) {
          NotificationManager.success(t('subscriptionThanks'));
          setData({});
          onCloseModal();
        }
      })
      .catch((err) => {
        if (err.response.status === 422){
          setIsLoading(false);
          return NotificationManager.error(t('recurredEmail'));
        }
      });
  }

  return (
    <div className="join-wrapper">
      {
        window.innerWidth <= 760
        ? (< div className = 'small-box' >
          <div className="close-container" onClick={onCloseModal}>
            <span className="close-button">X</span>
          </div>
          <h4 className="title">
            {t('joinText')}
          </h4>
          <input 
            className="email-input"
            onChange={(val) => onChangeValue('email', val.target.value)}
            placeholder={t('EnterEmail')}
          />
          <button
            disabled={isLoading}
            className="button" 
            onClick={submitForm} 
          >
            {t('joinButton')}
          </button>
        </div>)
        : (
          <div className='box-bg'>
            <div className='golden-frame'>
              <div className='large-box'>
                <div className="close-container" onClick={onCloseModal}>
                  <span className="close-button">X</span>
                </div>
                <div className="margin-content">
                  {/* <h4 className="title">
                    Women's Day
                  </h4> */}
                  <p className="text">
                    {t('joinText')}
                  </p>
                  <div className="email-container">
                    <p className="email-span">
                      {t('joinHeaderText')}
                    </p>
                    <input 
                      className="email-input"
                      onChange={(val) => onChangeValue('email', val.target.value)}
                      placeholder={t('EnterEmail')}
                    />
                    <button
                      disabled={isLoading}
                      className="button" 
                      onClick={submitForm} 
                      className="email-submit-button"
                    >
                      {t('joinBigModalButton')}
                    </button>
                    <span className="close-text" onClick={onCloseModal}>
                      {t('sorryAnotherTime')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
export default withNamespaces()(Join);