import React, { useState, useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
import {NotificationManager} from 'react-notifications';
import Image from '../../assets/images/contact-me-page.jpeg';

import './style.scss';
import api from '../../config/api';
import endpoints from '../../config/endpoints';


const Contact = ({t}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

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

  /**
   * Validate data
   * @private
   */
  const validate = () => {
    if (!data.name) return NotificationManager.error(t('insertName')), false;
    if (!data.email) return NotificationManager.error(t('insertEmail')), false;
    if (!data.email.match(/\S+@\S+\.\S+/)) return NotificationManager.error(t('validEmail')), false;
    if (!data.subject) return NotificationManager.error(t('insertSubject')), false;
    if (data.subject.length < 3) return NotificationManager.error('Subject must be at least 3 characters'), false;
    if (!data.message) return NotificationManager.error(t('insertMessage')), false;
    return true;
  }

  /**
   * Submit cotnact form data
   * 
   * @private
   */
  const submitForm = async () => {
    if (!validate()) return;
    setIsLoading(true);
    await api.post(endpoints.support, data)
      .then((res) => {
         setIsLoading(false);
        if (res.data.success) {
          NotificationManager.success('Your message sent successfully, Thanks');
          clearInputs();
        }
      })
      .catch((err) => {
        const {errors} = err.response.data;
        setIsLoading(false);
        Object.keys(errors)
          .forEach(e => NotificationManager.error(errors[e][0]));
      });
  }

  const clearInputs = () => {
    Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
    Array.from(document.querySelectorAll("textarea")).forEach(input => (input.value = ""));
    setData({});
  }

  return (
    <div className="container contact">
      <div className="header" style={{backgroundImage: Image}}>
        <div className="header-text">
          <h2>{t('getInTouch')}</h2>
        </div>
      </div>
      <div className="form-container">
        <div className="input-container">
          <label className="form-title">
            {t('yourName')}
          </label>
          <input 
            onChange={(v) => onChangeValue('name', v.target.value)}
            defaultValue={data.name}
            className="form-input"
          />
        </div>
        <div className="input-container">
          <span className="form-title">
            {t('yourEmail')} 
          </span>
          <input 
            onChange={(v) => onChangeValue('email', v.target.value)}
            defaultValue={data.email}
            className="form-input"
          />
        </div>
        <div className="input-container">
          <span className="form-title">
            {t('subject')}
          </span>
          <input 
            onChange={(v) => onChangeValue('subject', v.target.value)}
            defaultValue={data.subject}
            className="form-input"
          />
        </div>
        <div className="input-container">
          <span className="form-title">
            {t('yourMessage')} 
          </span>
          <textarea 
            onChange={(v) => onChangeValue('message', v.target.value)}
            defaultValue={data.message}
            className="form-input"
            rows={7}
            maxLength="254"
          >
          </textarea>
        </div>
        <input 
          onClick={submitForm}
          className="form-button"
          type='submit'
          value={isLoading ? 'Sending....': t('send')}
        />
      </div>
    </div>
  )
}

export default withNamespaces()(Contact);