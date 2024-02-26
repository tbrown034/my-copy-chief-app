import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function AboutBox({ toggleAbout }) {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleAbout}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col gap-4 p-4 overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-2xl">
                  <div className="text-2xl font-bold underline underline-offset-8">
                    About
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="pt-2 text-xl font-bold ">The App</p>
                    <p className="text-sm">
                      Copy Chief is a Wordle-inspired game that challenges users
                      to guess the top headlines of the day.
                    </p>

                    <p className="text-sm">
                      This project is built using React (Vite), stylized using
                      Tailwind CSS, Headless UI and FontAwesome and hosted on
                      Heroku with a backend server built though Express.js. The
                      headlines are fetched using the New York Times API.
                    </p>
                    <div className="flex gap-4">
                      <a
                        href="https://github.com/tbrown034/my-copy-chief-app"
                        className="flex items-center justify-center p-2 text-sm bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
                      >
                        <i className="mr-2 fa-brands fa-github"></i> Github
                      </a>
                      <a
                        href="https://developer.nytimes.com/apis"
                        className="flex items-center justify-center p-2 text-sm bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
                      >
                        <i className="mr-2 fa-solid fa-code"></i> New York Times
                        API
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="pt-2 text-xl font-bold border-t border-black border-opacity-30">
                      The Developer
                    </p>

                    <p className="text-sm">
                      Hi, my name is Trevor Brown! After nearly 15 years as an
                      award-winning investigative reporter, I recently made a
                      career change and began my web development journey.
                    </p>
                    <p className="text-sm">
                      This project embodies my profound passion for journalism
                      and web development. I am actively seeking my next
                      challenge and am eager to explore opportunities at the
                      intersection of journalism tech.
                    </p>
                    <p className="text-sm">
                      Please don't hesitate to contact me with questions,
                      opportunities or anything else!
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href="mailto:trevorbrown.web@gmail.com"
                      className="flex items-center justify-center p-2 text-sm bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
                    >
                      <i className="mr-2 fa-solid fa-envelope"></i> Contact Me
                    </a>
                    <a
                      href="https://trevorthewebdeveloper.com/"
                      className="flex items-center justify-center p-2 text-sm bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
                    >
                      <i className="mr-2 fa-solid fa-external-link-alt"></i>{" "}
                      View My Portfolio Site
                    </a>
                  </div>

                  <div className="flex justify-center mt-4">
                    <button
                      type="button"
                      className="flex items-center justify-center p-2 px-6 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
                      onClick={toggleAbout}
                    >
                      <i className="mr-2 fa-solid fa-arrow-left"></i> Back
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
