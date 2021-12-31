import React, { useState } from 'react';

import CourseForm from './global/CourseForm';
import Ticket from './global/Ticket';

const Landing = () => {
  const [giveCourse, setGiveCourse] = useState({});
  const [getCourse, setGetCourse] = useState({});

  const search = () => {
    console.log('search');
  };

  const ticket = {
    ticketId: '123',
    getCourse: {
      subject: 'COM SCI',
      course: '32',
    },
    giveCourse: {
      subject: 'COM SCI',
      course: '33',
      lec: '2',
      disc: 'C',
    },
    owner: 'Jeffrey',
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
      <div>
        <Ticket ticket={ticket}></Ticket>
      </div>
    </div>
  );
};

export default Landing;
