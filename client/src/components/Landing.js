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
      <form onSubmit={() => search()}>
        <CourseForm isGive={true} onChange={setGiveCourse} />
        <CourseForm isGive={false} onChange={setGetCourse} />
        <div class="flex flex-col items-center">
          <button type="submit" class="btn-primary w-auto mt-6">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Landing;
