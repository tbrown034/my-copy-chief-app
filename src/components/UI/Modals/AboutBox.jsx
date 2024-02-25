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
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        About the App
                      </h3>
                      <p className="text-sm text-gray-500">
                        Copy Chief is a Wordle-inspired game that challenges
                        users to guess the top headlines of the day.
                      </p>

                      <p className="text-sm text-gray-500">
                        This project is built using React (Vite), stylized using
                        Tailwind CSS, Headless UI and FontAwesome and hosted on
                        Heroku with a backend server built though Express.js.
                        The headlines are fetched using the New York Times API.
                      </p>
                      <div className="flex gap-4 ">
                        {" "}
                        <a
                          href="https://github.com/tbrown034/my-copy-chief-app"
                          className="p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
                        >
                          Github
                        </a>
                        <a
                          href="https://www.nytimes.com/"
                          className="p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
                        >
                          Visit The New York Times
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        About the Developer
                      </h3>

                      <p className="text-sm text-gray-500">
                        Hi, my name is Trevor Brown! After nearly 15 years as an
                        award-winning investigative reporter, I recently made a
                        career change and began my web development journey.
                      </p>
                      <p className="text-sm text-gray-500">
                        This project embodies my profound passion for journalism
                        and web development. I am actively seeking my next
                        challenge and am eager to explore opporutnites at the
                        interesection of journalism tech.
                      </p>
                      <p className="text-sm text-gray-500">
                        Please don't hesitate to{" "}
                        <a
                          className="underline"
                          href="trevorbrown.web@gmail.com"
                        >
                          contact me
                        </a>
                        with questions, opporutnites or if you just want to talk
                        journalism and/or coding!
                      </p>
                    </div>

                    <div className="flex gap-4 j ">
                      {" "}
                      <a
                        mailto="trevorbrown.web@gmail.com"
                        className="p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
                      >
                        Contact Me
                      </a>
                      <a
                        href="https://trevorthewebdeveloper.com/"
                        className="p-2 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
                      >
                        Learn More
                      </a>
                    </div>

                    <div className="flex justify-center mt-4">
                      <button
                        type="button"
                        className="p-2 px-6 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700"
                        onClick={toggleAbout}
                      >
                        Back
                      </button>
                    </div>
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
