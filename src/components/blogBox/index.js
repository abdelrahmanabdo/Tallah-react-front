import React from 'react';
import { withNamespaces } from 'react-i18next';
import moment from 'moment';
import {Link, NavLink} from 'react-router-dom';

// Imports
import Image from '../../assets/images/about-us-image.png';
import './style.scss';

function BlogBox({data, i18n}) {
  return (
    <div className="box-wrapper">
      <Link to={'/chit-chat/details/' + data.id}  className="left">
        <img src={data.image ? data.image.image : Image} />
      </Link>
      <div 
        className="right"
        style={{paddingRight: i18n.language === 'ar' ? '20px' : '0'}}
      >
        <p className="tags">
          { data.hashtags?.reduce((acc, cur, index, array) => 
              acc + cur.toUpperCase() + (index !== array.length - 1 ? ', ' : ''), '') }
        </p>
        <NavLink 
          to={'/chit-chat/details/' + data.id} 
          className="title"
        >
          <span style={{textAlign: 'start'}}>
            { 
              i18n.language === 'ar' && data.title_ar 
                ? data.title_ar 
                : data.title 
            }
          </span>
        </NavLink>
        <div className='details'>
          <span className='section'>
            {data.user?.name || 'Admin'}
          </span>
          <span className='section'>
          <i className="icon-message fa fa-clock-o mr-1"/> 
            { moment(data.created_at).fromNow()}
          </span>
          <span className='section'>
            <i className="icon-message fa fa-comment mr-1"/> {data.comments_count}
          </span>
        </div>
        <p 
          className="description" 
          style={{margin: i18n.language === 'ar' ? '0 15px' : '15px 0'}}
        >
          { 
            i18n.language === 'ar' && data.body_ar
              ? data.body_ar
              : data.body
          }
        </p>
      </div>
    </div>
  )
}
export default withNamespaces()(BlogBox);