import React, { useState, useEffect } from 'react';
import { withNamespaces } from 'react-i18next';

import './style.scss';

const Join = ({onCloseModal, t}) => {

  return (
    <div className="join-wrapper">
      <div className="close-container" onClick={onCloseModal}>
        <span className="close-button">X</span>
      </div>
      <h4 className="title">
        {t('joinText')}
      </h4>
      <input 
        className="email-input"
        placeholder={t('EnterEmail')}
      />
      <button className="button">
        {t('joinButton')}
      </button>
    </div>
  )
}
export default withNamespaces()(Join);