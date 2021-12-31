import React, { useEffect } from 'react';

const Ticket = ({ ticket }) => {
  const { ticketId, giveCourse, getCourse, owner } = ticket;
  // useEffect(() => {
  // 	console.log(ticket)
  // }, [ticket])

  return (
    <div className="flex justify-center flex-col items-center mt-6">
      <div className="flex w-3/4 lg:w-1/2 flex-col border-2 rounded-xl pt-6 px-6 pb-2 border-gray-300">
        <div class="flex flex-row justify-between items-center">
          <div class="flex flex-col">
            <text class="font-main text-2xl flex-start font-semibold mb-2">
              {giveCourse.subject + ' ' + giveCourse.course}
            </text>
            <text class="font-main text-lg flex-start mb-4">
              {(giveCourse.lec ? 'lec ' + giveCourse.lec : 'Any lec') +
                ', ' +
                (giveCourse.disc
                  ? 'disc ' + giveCourse.lec + giveCourse.disc
                  : 'Any disc')}
            </text>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 -mt-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>

          <div class="flex flex-col">
            <text class="font-main text-2xl flex-start font-semibold mb-2">
              {getCourse.subject + ' ' + getCourse.course}
            </text>
            <text class="font-main text-lg flex-start mb-4">
              {(getCourse.lec ? 'lec ' + getCourse.lec : 'Any lec') +
                ', ' +
                (getCourse.disc
                  ? 'disc ' + getCourse.course + getCourse.disc
                  : 'Any disc')}
            </text>
          </div>

          <div class="flex flex-col">
            <button class="btn-secondary mb-4"> Exchange </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
