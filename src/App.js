import {useEffect} from 'react';
import './index.scss';
import Header from './components/header';
import Home from './pages/home';
import About from './pages/about';
import Blog from './pages/blog';
import Details from './pages/blog/deatils';
import Contact from './pages/contact';
import Footer from './components/footer';
import Join from './pages/join';
import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';

import { BrowserRouter, Switch,  Route } from 'react-router-dom';

const history = createHistory()
history.listen(location => {
  ReactGA.set({
    page: location.pathname
  })
  ReactGA.pageview(location.pathname)
});

function App() {

  useEffect(() => ReactGA.pageview(window.location.pathname), []);

  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Header/>
        <div className="page-content-wrapper">
          <Switch>
            <Route exact path={['/', '']}>
              <Home />
            </Route>
            <Route path="/chit-chat-blog/:category">
              <Blog />
            </Route>
            <Route path="/chit-chat/details/:id">
              <Details />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/join">
              <Join />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
          </Switch>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
