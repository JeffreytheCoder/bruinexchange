import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    password2: '',
  });

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  const { email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      console.log(formData);
      register({ email, password });
    }
  };

  return (
    <div class="flex flex-col items-center justify-center">
      <div
        class="
          flex flex-col
          bg-white
          shadow-lg
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-3xl
          w-full
          md:w-2/3
          max-w-md
        "
      >
        <div class="font-medium self-center text-2xl sm:text-3xl text-gray-800">
          Sign up
        </div>
        <div class="mt-4 self-center text-lg sm:text-md text-gray-800">
          Start exchanging courses now!
        </div>

        <div class="mt-10">
          <form action="#" onSubmit={onSubmit}>
            <div class="flex flex-col mb-5">
              <label for="email" class="mb-1 tracking-wide text-gray-600">
                UCLA email:
              </label>
              <div class="relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  class="
                    placeholder-gray-500
                    pl-4
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Enter your ucla email"
                  onChange={onChange}
                />
              </div>
            </div>
            <div class="flex flex-col mb-5">
              <label for="email" class="mb-1 tracking-wide text-gray-600">
                Full name:
              </label>
              <div class="relative">
                <input
                  id="name"
                  type="name"
                  name="name"
                  class="
                    placeholder-gray-500
                    pl-4
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Enter your full name"
                  onChange={onChange}
                />
              </div>
            </div>
            <div class="flex flex-col mb-5">
              <label for="password" class="mb-1 tracking-wide text-gray-600">
                Password:
              </label>
              <div class="relative">
                <input
                  id="password"
                  type="password"
                  name="password"
                  class="
                    placeholder-gray-500
                    pl-4
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Enter your password"
                  onChange={onChange}
                />
              </div>
            </div>
            <div class="flex flex-col mb-6">
              <label for="password" class="mb-1 tracking-wide text-gray-600">
                Confirm password:
              </label>
              <div class="relative">
                <input
                  id="password2"
                  type="password"
                  name="password2"
                  class="
                    placeholder-gray-500
                    pl-4
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Enter your password again"
                  onChange={onChange}
                />
              </div>
            </div>

            <div class="flex w-full">
              <button
                type="submit"
                class="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white
                  bg-primary
                  hover:bg-light
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
              >
                <span class="mr-2 uppercase">Register</span>
                <span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="flex justify-center items-center mt-6">
        <a
          href="#"
          target="_blank"
          class="
            inline-flex
            items-center
            text-gray-700
            font-medium
            text-sm text-center
          "
        >
          <span class="ml-2">
            Already have an account?
            <Link to="/login" class="text-sm ml-2 text-primary font-semibold">
              Log In
            </Link>
          </span>
        </a>
      </div>
    </div>
    // <div className="flex my-10 justify-center items-center">
    //   <div className="w-full max-w-md">
    //     <form
    //       className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    //       onSubmit={onSubmit}
    //     >
    //       <div className="mb-4">
    //         <label
    //           className="block text-gray-700 text-sm font-bold mb-2"
    //           for="email"
    //         >
    //           Email{' '}
    //         </label>{' '}

    //         <input
    //           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //           id="email"
    //           name="email"
    //           type="text"
    //           placeholder="Email"
    //           onChange={onChange}
    //         />
    //       </div>{' '}
    //       <div className="mb-4">
    //         <label
    //           className="block text-gray-700 text-sm font-bold mb-2"
    //           for="password"
    //         >
    //           Password{' '}
    //         </label>{' '}
    //         <input
    //           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //           id="password"
    //           name="password"
    //           type="password"
    //           placeholder="Password"
    //           onChange={onChange}
    //         />
    //       </div>{' '}
    //       <div className="mb-8">
    //         <label
    //           className="block text-gray-700 text-sm font-bold mb-2"
    //           for="password2"
    //         >
    //           Confirm password{' '}
    //         </label>{' '}
    //         <input
    //           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //           id="password2"
    //           name="password2"
    //           type="password"
    //           placeholder="Confirm password"
    //           onChange={onChange}
    //         />{' '}
    //         {/* <p className="text-red-500 text-xs italic">Please confirm your password.</p> */}{' '}
    //       </div>{' '}
    //       <div className="flex items-center justify-between">
    //         <button
    //           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover-transition"
    //           type="submit"
    //         >
    //           Register{' '}
    //         </button>{' '}
    //         <Link
    //           to="/login"
    //           className="inline-block align-baseline font-bold text-sm text-primary hover:text-blue-800"
    //         >
    //           Sign in
    //         </Link>{' '}
    //       </div>{' '}
    //     </form>{' '}
    //     {/* <p className="text-center text-gray-500 text-xs">
    //       & copy; 2020 Acme Corp.All rights reserved.{' '}
    //     </p>{' '} */}
    //   </div>{' '}
    // </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
