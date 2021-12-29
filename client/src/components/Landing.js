import React, { useState } from 'react';

import CourseForm from './global/CourseForm';

const Landing = () => {
  const [giveCourse, setGiveCourse] = useState({});
  const [getCourse, setGetCourse] = useState({});

  const search = () => {
    console.log('search');
  };

  return (
    <div class="flex flex-col">
      <CourseForm isGive={true} onChange={setGiveCourse} />
      <CourseForm isGive={false} onChange={setGetCourse} />
      <div class="flex flex-col items-center">
        <button class="btn-primary w-auto mt-6" onClick={() => search()}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Landing;
