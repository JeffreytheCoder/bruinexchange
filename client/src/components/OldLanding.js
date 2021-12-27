import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Footer from './global/Footer';
import logo from '../images/bruin-exchange-logo.png';

const Landing = () => {
  return (
    <div class="flex flex-col h-screen justify-between">
      <header class="font-main flex flex-row items-center justify-between flex-wrap p-6">
        <div class="lg:flex-grow flex-1"></div>

        <div>
          <Link
            to="/post"
            class="text-lg inline-block px-4 py-3 leading-none border-2 rounded-lg border-white text-white bg-primary hover:bg-white hover:text-primary hover:border-primary mt-4 lg:mt-0 mr-6"
          >
            Sell Your Course
          </Link>
        </div>
        <div>
          <Link
            to="/login"
            class="text-lg block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-primary mr-6"
          >
            Login
          </Link>
        </div>
      </header>

      <div class="flex justify-center items-center flex-col my-16">
        <img
          class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 mb-10"
          src={logo}
          alt="bruinpass logo"
        ></img>

        <div class="container flex justify-center items-center px-2 sm:px-4 lg:px-4 mb-20">
          <div class="relative w-2/3 lg:w-1/2 border-gray-400 border-2 rounded-lg p-0.5">
            {' '}
            <input
              type="text"
              class="font-main text-gray-600 h-12 w-full pr-8 pl-5 rounded z-0 border-none outline-none text-xl"
              placeholder="Search for the course you want to take..."
            />
            <div class="absolute top-4 right-3">
              {/* <i class="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>{' '} */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="-mt-1 mr-1 h-7 w-7 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <Link to="/about">
          <div class="font-main underline text-dark font-bold text-lg">
            How does BruinPass works?
          </div>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
