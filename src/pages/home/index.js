import React, { useState, useEffect } from 'react';
import Slider from '../../components/slider';
import Blog from '../blog';

import './style.scss';

const Home = (props) => {

  return (
    <div className="container home">
      <Slider />
      <Blog />
    </div>
  )
}

export default Home;