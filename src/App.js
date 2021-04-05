import './index.css';
import Header from './components/header';
import Home from './pages/home';
import About from './pages/about';
import Blog from './pages/blog';
import Details from './pages/blog/deatils';
import Contact from './pages/contact';
import Footer from './components/footer';
import Join from './pages/join';

import { BrowserRouter,Switch, Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Header/>
        <div className="page-content-wrapper">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/chic-chat-blog/:category">
              <Blog />
            </Route>
            <Route path="/chic-chat/details">
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
