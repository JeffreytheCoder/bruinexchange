import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const Ticket = ({ ticket, showStatus, isOwner }) => {
  const { _id, give_course, get_course, complete } = ticket;

  const [showConfirm, setShowConfirm] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [contact, setContact] = useState({});
  const [jump, setJump] = useState(false);

  const exchange = async () => {
    const res = await axios.put('/api/ticket/' + _id + '/complete');

    const { name, email } = res.data.owner;
    setContact({ name, email });

    setShowConfirm(false);
    setShowContact(true);
  };

  const finish = () => {
    setShowContact(false);
  };

  if (jump) {
    return <Redirect to="/my-tickets" />;
  }

  return (
    // <div className="flex justify-center flex-col items-center mt-6">
    <div className="flex w-4/5 flex-col shadow-md rounded-xl pt-6 px-6 pb-2 mb-6">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center sm:items-start">
          <text class="font-main text-lg flex-start mb-2">
            {isOwner ? 'You give out:' : 'A bruin gives out:'}
          </text>
          <text class="font-main text-2xl flex-start font-semibold mb-1">
            {give_course.subject + ' ' + give_course.course}
          </text>
          <text class="font-main text-xl flex-start mb-6 font-medium">
            {(give_course.lec ? 'lec ' + give_course.lec : 'Any lec') +
              ', ' +
              (give_course.disc
                ? 'disc ' + give_course.lec + give_course.disc
                : 'Any disc')}
          </text>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 mb-6 sm:my-6"
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

        <div class="flex flex-col items-center sm:items-start">
          <text class="font-main text-lg flex-start mb-2">
            {isOwner ? 'A bruin receives:' : 'You receive:'}
          </text>
          <text class="font-main text-2xl flex-start font-semibold mb-1">
            {get_course.subject + ' ' + get_course.course}
          </text>
          <text class="font-main text-xl flex-start mb-6 font-medium">
            {(get_course.lec ? 'lec ' + get_course.lec : 'Any lec') +
              ', ' +
              (get_course.disc
                ? 'disc ' + get_course.course + get_course.disc
                : 'Any disc')}
          </text>
        </div>

        {showStatus ? (
          <div class="flex flex-col">
            <text class="text-2xl font-medium text-primary mb-6 sm:mb-4">
              {complete ? 'Completed' : 'Pending'}
            </text>
          </div>
        ) : (
          <div class="flex flex-col">
            <button
              class="btn-secondary mb-6 sm:mb-4"
              onClick={() => setShowConfirm(true)}
            >
              Exchange
            </button>
          </div>
        )}

        {showConfirm ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Confirm exchange this course?
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowConfirm(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative px-6 pt-3 flex-auto">
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      By selecting "confirm", you will get the exchanging
                      person's contact info. You have to contact him/her and
                      complete the course exchange within 3 days from now on. If
                      not, your account could be in risk of being banned.
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 rounded-b">
                    <button
                      className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowConfirm(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-primary text-white active:bg-primary font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => exchange()}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}

        {showContact ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Exchange succeeded
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowContact(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative px-6 pt-3 flex-auto">
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      Your exchanging person's contact info
                    </p>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      Name: {contact.name}
                    </p>
                    <p className="text-blueGray-500 text-lg leading-relaxed">
                      Email: {contact.email}
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 rounded-b">
                    <button
                      className="bg-primary text-white active:bg-primary font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setJump(true)}
                    >
                      Got it!
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </div>
    // </div>
  );
};

export default Ticket;
