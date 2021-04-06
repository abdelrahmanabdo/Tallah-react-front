import React, { useState, useEffect } from 'react';

import './style.scss';

const Join = (props) => {
  const [state, setState] = useState('');

  return (
    <div className="container join">
      <div className="coming-soon-container">
        <h3>Coming soon !!!!!</h3>
      </div>
    </div>
  )
}

export default Join;