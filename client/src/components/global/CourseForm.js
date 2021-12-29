import React, { useState, useEffect } from 'react';

import Select from 'react-select';

import subjectCourses from '../../files/subjectCourses.json';

const CourseForm = () => {
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
            onChange={(selectedOption) =>
              setFormData({ ...formData, subject: selectedOption })
            }
          />
          <Select
            className="basic-single w-auto mr-6 text-lg"
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
          <Select
            className="basic-single w-auto mr-6 text-lg"
            classNamePrefix="select"
            defaultValue={''}
            isSearchable={true}
            placeholder={'Select a lecture...'}
            isClearable={true}
            name="lecture"
            options={lecs}
            value={formData.lec}
            onChange={(selectedOption) =>
              setFormData({ ...formData, lec: selectedOption })
            }
          />
          <Select
            className="basic-single w-auto mr-6 text-lg"
            classNamePrefix="select"
            defaultValue={''}
            isSearchable={true}
            placeholder={'Select a discussion...'}
            isClearable={true}
            name="discussion"
            options={discs}
            value={formData.disc}
            onChange={(selectedOption) =>
              setFormData({ ...formData, disc: selectedOption })
            }
          />
        </form>{' '}
      </div>{' '}
    </div>
  );
};

export default CourseForm;
