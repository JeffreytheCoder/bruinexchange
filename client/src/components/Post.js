import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import CourseForm from './global/CourseForm';

const Post = () => {
  const [giveCourse, setGiveCourse] = useState({});
  const [getCourse, setGetCourse] = useState({});

  const post = async () => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const body = JSON.stringify({
      give_course: giveCourse,
      get_course: getCourse,
    });

    const res = await axios.post('/api/ticket', body, config);
    console.log(res);
  };

  return (
    <div class="flex flex-col">
      <form onSubmit={() => post()}>
        <CourseForm isGive={true} onChange={setGiveCourse} />
        <CourseForm isGive={false} onChange={setGetCourse} />
        <div class="flex flex-col items-center">
          <button class="btn-primary w-auto mt-6" type='submit'>
            Post Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default Post;
