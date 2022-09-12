import React, { useState, useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
import './style.scss';
import api from '../../config/api';
import endpoints from '../../config/endpoints';
import Spinner from '../../components/spinner';

const Policy = ({t, i18n}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  /**
   * Get about us data
   * @private
   */
  const getData = async () => {
    setIsLoading(true);
    let url = endpoints.privacyPolicy;
    await api
      .get(url)
      .then(res => setData(res.data.data), setIsLoading(false));
  }

  useEffect(() => getData(), []);

  return (
    <div className="container policy">
      <h3 className="title">
        {t('policy')}
      </h3>
      <p className="text">
      { i18n.language === 'ar' && data.text_ar
          ? data?.text_ar 
          : data.text }
      </p>
    </div>
  )
}

export default withNamespaces()(Policy);