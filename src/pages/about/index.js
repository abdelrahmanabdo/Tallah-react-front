import React, { useState, useEffect } from 'react';
import './style.scss';
import AboutImage from '../../assets/images/about-us-image.png';
import api from '../../config/api';
import endpoints from '../../config/endpoints';
import Spinner from '../../components/spinner';

const About = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  /**
   * Get about us data
   * @private
   */
  const getData = async () => {
    setIsLoading(true);
    let url = endpoints.about;
    await api
      .get(url)
      .then(res => setData(res.data.data), setIsLoading(false));
  }

  useEffect(() => getData(), []);

  return (
    <div className="container about">
      <img 
        src={AboutImage}
        className="left"
      />
      <div className="right">
        <h3 className="title">
          {data?.title}
        </h3>
        <p className="text">
          {data?.text}
        </p>
      </div>
    </div>
  )
}

export default About;