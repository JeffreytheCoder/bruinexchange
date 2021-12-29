import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/global/PrivateRoute';
import Alert from './components/global/Alert';
import Navbar from './components/global/Navbar';
import Footer from './components/global/Footer';

import Landing from './components/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Post from './components/Post';
// import CreatePage from './components/page/CreatePage';

// redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/post" component={Post} />

          {/* <Route exact path="/create-page" component={CreatePage} /> */}
          {/* <Route exact path='/my-pages' component={MyPages} />
          <Route exact path='/following' component={Following} />
          <Route exact path='/me' component={Me} /> */}
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
