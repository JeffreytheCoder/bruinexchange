import { React, useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import Spinner from './Spinner';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuth, setIsAuth] = useState(0);

  useEffect(() => {
    if (localStorage.token) {
      setIsAuth(true);
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};

export default PrivateRoute;
