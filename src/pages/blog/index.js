import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import BlogBox from '../../components/blogBox';
import BlogLatest from '../../components/blogLatest';

import './style.scss';
import api from '../../config/api';
import endpoints from '../../config/endpoints';
import Spinner from '../../components/spinner';

const Blog = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const {category} = useParams()

  /**
   * Get blogs data
   * @private
   */
  const getData = async () => {
    setIsLoading(true);
    let url = endpoints.blog;
    if (category && category !== 'All') url += '?category=' + category;
    await api.get(url).then(res => setData(res.data.data), setIsLoading(false));
  }

  useEffect(() => {
   getData();
   return () => setIsLoading(true);
  }, [category]);

  return (
    <div className="container blog">
      {
        isLoading ?
          <Spinner />
          :
          <>
            <div className="blogs-container">
              {
                data && data.length === 0
                ? <h2 style={{textAlign: 'start'}}> No Blogs </h2>
                : data.map((blog) => <BlogBox data={blog}  key={blog.id} />)
              }
            </div>
            <BlogLatest />
          </>
      }

    </div>
  )
}

export default Blog;