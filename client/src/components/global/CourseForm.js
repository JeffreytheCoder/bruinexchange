import React, { useState, useEffect, Fragment } from 'react';

import Select from 'react-select';

import subjectCourses from '../../assets/subjectCourses.json';

const CourseForm = ({ isGive, onChange }) => {
  const lecOptions = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];
  const discOptions = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  const [formData, setFormData] = useState({
    subject: '',
    course: '',
    lec: 0,
    disc: '',
  });

  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lecs, setLecs] = useState([]);
  const [discs, setDiscs] = useState([]);

  useEffect(() => {
    const subjects = [];
    Object.keys(subjectCourses).map((subject, idx) => {
      subjects.push({ value: subject, label: subject });
    });
    setSubjects(subjects);
  }, []);

  useEffect(() => {
    if (formData.subject) {
      const courseJson = subjectCourses[formData.subject.value].courses;
      const courses = [];

      Object.keys(courseJson).map((course, idx) => {
        courses.push({
          value: course,
          label: course + '. ' + courseJson[course],
        });
      });
      setCourses(courses);
    } else {
      setCourses([]);
    }
  }, [formData.subject]);

  useEffect(() => {
    if (formData.course) {
      const lecs = [];
      lecOptions.forEach((lec) => {
        lecs.push({ value: lec, label: lec });
      });
      setLecs(lecs);
    } else {
      setLecs([]);
    }
  }, [formData.course]);

  useEffect(() => {
    if (formData.lec != 0) {
      const discs = [];
      discOptions.forEach((disc) => {
        discs.push({
          value: disc,
          label: formData.lec.value.toString() + disc,
        });
      });
      setDiscs(discs);
    } else {
      setDiscs([]);
    }
  }, [formData.lec]);

  useEffect(() => {
    onChange({
      subject: formData.subject?.value,
      course: formData.course?.value,
      lec: formData.lec?.value,
      disc: formData.disc?.value,
    });
  }, [formData]);

  return (
    <div className="flex justify-center flex-col items-center mt-6">
      <div className="flex w-4/5 flex-col border-2 rounded-xl pt-6 px-6 pb-2 border-gray-300">
        {isGive ? (
          <text class="font-main text-2xl flex-start font-semibold mb-4">
            Give out this course...
          </text>
        ) : (
          <text class="font-main text-2xl flex-start font-semibold mb-4">
            And get this course!
          </text>
        )}
        {/* <form onSubmit={() => search()}> */}
        <div class="flex flex-col md:flex-row justify-start">
          <Fragment>
            <Select
              className="basic-single w-full text-lg mr-6 mb-4"
              classNamePrefix="select"
              isSearchable={true}
              placeholder={'Select a subject...'}
              isClearable={true}
              name="subject"
              options={subjects}
              value={formData.subject}
              onChange={(selectedOption) =>
                setFormData({ ...formData, subject: selectedOption })
              }
            />
            <input
              class="absolute opacity-0"
              value={formData.subject}
              autoComplete="off"
              required={true}
            />
          </Fragment>
          <Fragment>
            <Select
              className="basic-single w-full text-lg mr-6 mb-4"
              classNamePrefix="select"
              defaultValue={''}
              isSearchable={true}
              placeholder={'Select a course...'}
              isClearable={true}
              name="course"
              options={courses}
              value={formData.course}
              onChange={(selectedOption) =>
                setFormData({ ...formData, course: selectedOption })
              }
            />
            <input
              class="absolute opacity-0"
              value={formData.course}
              autoComplete="off"
              required={true}
            />
          </Fragment>
        </div>

        <div class="flex flex-col md:flex-row justify-start">
          <Fragment>
            <Select
              className="basic-single w-full text-lg mr-6 mb-4"
              classNamePrefix="select"
              defaultValue={''}
              isSearchable={true}
              placeholder={
                isGive
                  ? 'Select a lecture...'
                  : 'Select a lecture... (optional)'
              }
              isClearable={true}
              name="lecture"
              options={lecs}
              value={formData.lec}
              onChange={(selectedOption) =>
                setFormData({ ...formData, lec: selectedOption })
              }
            />
            {isGive && (
              <input
                class="absolute opacity-0"
                value={formData.lec}
                autoComplete="off"
                required={true}
              />
            )}
          </Fragment>
          <Fragment>
            <Select
              className="basic-single w-full text-lg mr-6 mb-4"
              classNamePrefix="select"
              defaultValue={''}
              isSearchable={true}
              placeholder={
                isGive
                  ? 'Select a discussion...'
                  : 'Select a discussion... (optional)'
              }
              isClearable={true}
              name="discussion"
              options={discs}
              value={formData.disc}
              onChange={(selectedOption) =>
                setFormData({ ...formData, disc: selectedOption })
              }
            />
            {isGive && (
              <input
                class="absolute opacity-0"
                value={formData.disc}
                autoComplete="off"
                required={true}
              />
            )}
          </Fragment>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default CourseForm;
