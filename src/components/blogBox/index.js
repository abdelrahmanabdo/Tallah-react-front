import React from 'react';
import moment from 'moment';
import {Link, NavLink} from 'react-router-dom';

// Imports
import Image from '../../assets/images/about-us-image.png';
import './style.scss';

export default function BlogBox({data}) {
  return (
    <div className="box-wrapper">
      <Link to="/chic-chat/details" className="left">
        <img src={data.image ? data.image.image : Image} />
      </Link>
      <div className="right">
        <div className="tags">
          { data.hashtags?.reduce((acc, cur) => acc + cur.toUpperCase() + ', ', '') }
        </div>
        <NavLink 
          to={'/chic-chat/details/' + data.id} 
          className="title"
        >
          {data.title}
        </NavLink>
        <div className='details'>
          <span className='section'>
            {data.user?.name || 'Admin'}
          </span>
          <span className='section'>
          <i className="icon-message fa fa-clock-o mr-1"/> { moment(data.created_at).fromNow()}
          </span>
          <span className='section'>
            <i className="icon-message fa fa-comment mr-1"/> {data.comments_count}
          </span>
        </div>
        <p className="description">
          {data.body}
        </p>
      </div>
    </div>
  )
}
