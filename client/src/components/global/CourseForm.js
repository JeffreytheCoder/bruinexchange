import React, { useState, useEffect } from 'react';

import Select from 'react-select';

import subjectCourses from '../../assets/subjectCourses.json';

const CourseForm = ({ isGive }) => {
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
    if (formData.subject != '') {
      const courseJson = subjectCourses[formData.subject.value].courses;
      const courses = [];

      Object.keys(courseJson).map((course, idx) => {
        courses.push({
          value: course,
          label: course + '. ' + courseJson[course],
        });
      });
      setCourses(courses);
    }
  }, [formData.subject]);

  useEffect(() => {
    if (formData.course != '') {
      const lecs = [];
      lecOptions.forEach((lec) => {
        lecs.push({ value: lec, label: lec });
      });
      setLecs(lecs);
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
    }
  }, [formData.lec]);

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="flex justify-center flex-col items-center mt-6">
      <div className="flex w-4/5 flex-col border-2 rounded-xl pt-6 px-6 pb-2 border-gray-300">
        {isGive ? (
          <text class="font-main text-2xl flex-start font-semibold mb-4">
            Give out...
          </text>
        ) : (
          <text class="font-main text-2xl flex-start font-semibold mb-4">
            And get...
          </text>
        )}
        <div class="flex flex-col md:flex-row justify-start">
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
        </div>
        <div class="flex flex-col md:flex-row justify-start">
          <Select
            className="basic-single w-full text-lg mr-6 mb-4"
            classNamePrefix="select"
            defaultValue={''}
            isSearchable={true}
            placeholder={
              isGive ? 'Select a lecture...' : 'Select a lecture... (optional)'
            }
            isClearable={true}
            name="lecture"
            options={lecs}
            value={formData.lec}
            onChange={(selectedOption) =>
              setFormData({ ...formData, lec: selectedOption })
            }
          />
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
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
