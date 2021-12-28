import React, { useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { login } from '../../actions/auth';

import Select from 'react-select';

import subjectCourses from '../../files/subjectCourses.json';
import e from 'express';

const CourseForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    course: '',
    lec: 0,
    disc: '',
  });

  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const subjects = [];
    Object.keys(subjectCourses).map((subject, idx) => {
      subjects.push({ value: subject, label: subject });
    });
    setSubjects(subjects);
  }, []);

  useEffect(() => {
    if (formData.subject != '') {
      setSubjects(subjectCourses[formData.subject].courses);
    }
  }, [formData.subject]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex w-2/3 flex-row flex-nowrap">
        <form className="flex bg-white flex-row" onSubmit={onSubmit}>
          <Select
            className="basic-single w-auto mr-6 text-lg"
            classNamePrefix="select"
            isSearchable={true}
            placeholder={'Select a subject...'}
            isClearable={true}
            name="subject"
            options={subjects}
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
          />
          {/* <div class="flex mr-10 w-auto mb-3">
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
              <option selected>Select a subject</option>
              {Object.keys(subjectCourses).map((key, idx) => {
                return (
                  <option value={key} id={idx}>
                    {key}
                  </option>
                );
              })}
            </select>
          </div> */}
          <Select
            className="basic-single w-auto mr-6 text-lg"
            classNamePrefix="select"
            defaultValue={''}
            isSearchable={true}
            placeholder={'Select a course...'}
            isClearable={true}
            name="subject"
            options={courses}
            value={formData.course}
          />
        </form>{' '}
        {/* <p className="text-center text-gray-500 text-xs">
          & copy; 2020 Acme Corp.All rights reserved.{' '}
        </p>{' '} */}
      </div>{' '}
    </div>
  );
};

export default CourseForm;
