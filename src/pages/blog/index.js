import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import BlogBox from '../../components/blogBox';
import BlogLatest from '../../components/blogLatest';

import './style.scss';
import api from '../../config/api';
import endpoints from '../../config/endpoints';

const Blog = (props) => {
  const [data, setData] = useState([]);
  const history = useRouteMatch()

  /**
   * Get blogs data
   * @private
   */
  const getData = async () => {
    await api.get(endpoints.blog)
            .then(res => setData(res.data.data));
  }

  useEffect(() => {
   getData();
  }, []);

  return (
    <div className="container blog">
      <div className="blogs-container">
        {
          data.length === 0
          ? <h2> No Blogs</h2>
          : data.map((blog) => <BlogBox data={blog} />)
        }
      </div>
      <BlogLatest />
    </div>
  )
}

export default Blog;