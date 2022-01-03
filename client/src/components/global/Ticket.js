import React, { useEffect } from 'react';

const Ticket = ({ ticket, showStatus }) => {
  const { _id, give_course, get_course, owner, complete } = ticket;
  // useEffect(() => {
  // 	console.log(ticket)
  // }, [ticket])

  return (
    <div className="flex justify-center flex-col items-center mt-6">
      <div className="flex w-4/5 flex-col border-2 rounded-xl pt-6 px-6 pb-2 border-gray-300">
        <div class="flex flex-col md:flex-row justify-around items-center">
          <div class="flex flex-col items-center md:items-start">
            <text class="font-main text-xl flex-start font-semibold mb-3">
              Some bruin gives out:
            </text>
            <text class="font-main text-2xl flex-start font-semibold mb-1">
              {give_course.subject + ' ' + give_course.course}
            </text>
            <text class="font-main text-lg flex-start mb-6">
              {(give_course.lec ? 'lec ' + give_course.lec : 'Any lec') +
                ', ' +
                (give_course.disc
                  ? 'disc ' + give_course.lec + give_course.disc
                  : 'Any disc')}
            </text>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 mb-6 md:my-6"
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

          <div class="flex flex-col items-center md:items-start">
            <text class="font-main text-xl flex-start font-semibold mb-3">
              You receive:
            </text>
            <text class="font-main text-2xl flex-start font-semibold mb-1">
              {get_course.subject + ' ' + get_course.course}
            </text>
            <text class="font-main text-lg flex-start mb-6">
              {(get_course.lec ? 'lec ' + get_course.lec : 'Any lec') +
                ', ' +
                (get_course.disc
                  ? 'disc ' + get_course.course + get_course.disc
                  : 'Any disc')}
            </text>
          </div>

          {showStatus ? (
            <div class="flex flex-col">
              <button class="btn-secondary mb-6 md:mb-4"> Exchange </button>
            </div>
          ) : (
            <div class="flex flex-col">
              <text class="text-2xl font-semibold text-primary mb-6 md:mb-4">
                {complete ? 'Completed' : 'Pending'}
              </text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ticket;
