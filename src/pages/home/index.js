import React, { useState, useEffect } from 'react';
import Slider from '../../components/slider';
import Blog from '../blog';
import { withNamespaces } from 'react-i18next';

import './style.scss';

const Home = ({i18n}) => {
  return (
    <div className="container home">
      <Slider i18n={i18n} />
      <Blog />
    </div>
  )
}

export default withNamespaces()(Home);
