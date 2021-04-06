import React, { useState, useEffect } from 'react';
import {NotificationManager} from 'react-notifications';
import Image from '../../assets/images/contact-me-page.jpeg';

import './style.scss';
import api from '../../config/api';
import endpoints from '../../config/endpoints';


const Contact = (props) => {
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
    ;
    if (!data.name) return NotificationManager.error('Please insert your name'), false;
    if (!data.email) return NotificationManager.error('Please insert your E-mail'), false;
    if (!data.subject) return NotificationManager.error('Please insert Message subject'), false;
    if (!data.message) return NotificationManager.error('Please insert your Message'), false;
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
          setData({});
        }
      })
      .catch((err) => setIsLoading(false), NotificationManager.error('An error happened, please try again'));
  }

  return (
    <div className="container contact">
      <div className="header" style={{backgroundImage: Image}}>
        <div className="header-text">
          <h2>Get in touch</h2>
        </div>
      </div>
      <div className="form-container">
        <div className="input-container">
          <label className="form-title">
            Your name 
          </label>
          <input 
            onChange={(v) => onChangeValue('name', v.target.value)}
            value={data.name}
            className="form-input"
          />
        </div>
        <div className="input-container">
          <span className="form-title">
            Your E-mail 
          </span>
          <input 
            onChange={(v) => onChangeValue('email', v.target.value)}

            value={data.email}
            className="form-input"
          />
        </div>
        <div className="input-container">
          <span className="form-title">
            Subject
          </span>
          <input 
            onChange={(v) => onChangeValue('subject', v.target.value)}
            value={data.subject}
            className="form-input"
          />
        </div>
        <div className="input-container">
          <span className="form-title">
            Your message 
          </span>
          <textarea 
            onChange={(v) => onChangeValue('message', v.target.value)}
            value={data.message}
            className="form-input"
            rows={7}
          >
          </textarea>
        </div>
        <input 
          onClick={submitForm}
          className="form-button"
          type='submit'
          value={isLoading ? 'Sending....': 'Send'}
        />
      </div>
    </div>
  )
}

export default Contact;