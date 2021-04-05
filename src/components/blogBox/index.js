import React from 'react'
import './style.scss';
import {Link} from 'react-router-dom';
// Imports
import Image from '../../assets/images/about-us-image.png';

export default function BlogBox({data}) {
  return (
    <div className="box-wrapper">
      <Link to="/chic-chat/details" className="left">
        <img src={Image} />
      </Link>
      <div className="right">
        <div className="tags">
          BEAUTY, LIFESTYLE, WOMENOLOGY
        </div>
        <Link to="/chic-chat/details" className="title">
          {data.title}
        </Link>
        <div className='details'>
          <span className='section'>
            By Admin
          </span>
          <span className='section'>
            {data.created_at}
          </span>
          <span className='section'>
            <i className="icon-message fa fa-comment mr-1"/> 4
          </span>
        </div>
        <p className="description">
          {data.body}
        </p>
      </div>
    </div>
  )
}
