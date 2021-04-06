import React from 'react'
import Logo from '../../assets/icons/logo.png';
import './index.scss';

export default function Spinner() {
  return (
    <div className="spinner-container">
      <img src={Logo} className="logo-spinner" />
    </div>
  )
}
