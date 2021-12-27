import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from '../../actions/auth';

const CourseForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    course: '',
    lec: 0,
    disc: '',
  });

  if (isAuthenticated) {
    try {
      history.goBack();
    } catch (err) {
      return <Redirect to="/" />;
    }
  }

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    login({ email, password });
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex-rol w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onSubmit}
        >
          <div class="flex justify-center">
            <div class="mb-3 xl:w-96">
              <select
                class="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
              >
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <div className="mb-8">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password{' '}
            </label>{' '}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={onChange}
            />
          </div>{' '}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign in{' '}
            </button>{' '}
            <Link
              to="/register"
              className="inline-block align-baseline font-bold text-sm text-primary hover:text-blue-800"
            >
              Register
            </Link>{' '}
          </div>{' '}
        </form>{' '}
        {/* <p className="text-center text-gray-500 text-xs">
          & copy; 2020 Acme Corp.All rights reserved.{' '}
        </p>{' '} */}
      </div>{' '}
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(CourseForm);
