import React from 'react';
import { withNamespaces } from 'react-i18next';
import moment from 'moment';
import {Link, NavLink} from 'react-router-dom';

// Imports
import Image from '../../assets/images/about-us-image.png';
import './style.scss';

function BlogBox({data , className, i18n, t}) {
  return (
    <div className= {'box-wrapper ' + className}>
      <Link to={'/' + (data.slug ? data.slug :  data.title)}  className="top">
        <img src={data.image ? data.image.image : Image} alt="img"/>
      </Link>
      <div className="footer" >
        <NavLink 
          to={'/' + (data.slug ? data.slug : data.title)} 
          className="title mb-3"
        >
          <span style={{textAlign: 'start'}}>
            { 
              (i18n.language === 'ar' && data.title_ar) || (data.title_ar && !data.title)
                ? data.title_ar 
                : data.title 
            }
          </span>
        </NavLink>
        <p className="description" dangerouslySetInnerHTML={
            {
              __html: (i18n.language === 'ar' && data.body_ar) || (data.body_ar && !data.body)
                ? data.body_ar
                : data.body
            }
          }
        />
        <div className='details'>
          <span className='section font-weight-bold'>
            <span className="font-weight-normal">{t('by')} </span>
            {
              data.user?.role_id == '3' 
                ? 'Tallah'
                : data.user?.name
            }
          </span>
          <div>
            <span className='section'>
              <i className="icon-message fa fa-clock-o mr-2"/>  
               { moment(data.created_at).fromNow()} 
            </span>
            {/* <span className='section'>
              <i className="icon-message fa fa-comment mr-1"/> {data.comments_count}
            </span> */}
          </div>
        </div>
        <Link className="continue-reading-button" to={'/' + (data.slug ? data.slug : data.title)}>
          {t('readMore')}
        </Link>
      </div>
    </div>
  )
}
export default withNamespaces()(BlogBox);