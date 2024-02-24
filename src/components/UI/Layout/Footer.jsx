export default function Footer({ toggleAbout, toggleHowToPlay }) {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 py-4 text-gray-700 dark:text-gray-300">
      <div>
        © 2024{" "}
        <a className="underline" href="trevorthewebdeveloper.com">
          Trevor Brown
        </a>{" "}
        - Copy Chief App. All rights reserved.
      </div>
      <div className="flex gap-4">
        <button
          onClick={toggleAbout}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-transparent border border-gray-700 rounded-md hover:bg-gray-200 dark:text-gray-300 dark:border-gray-300 dark:hover:bg-gray-700"
        >
          About
        </button>
        <button
          onClick={toggleHowToPlay}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-transparent border border-gray-700 rounded-md hover:bg-gray-200 dark:text-gray-300 dark:border-gray-300 dark:hover:bg-gray-700"
        >
          How to Play
        </button>
      </div>
      <div className="flex gap-4 text-sm">
        <a
          href="https://twitter.com/tbrownokc"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600"
        >
          <i className="fab fa-twitter"></i> Twitter
        </a>
        <a
          href="https://github.com/tbrown034"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 dark:hover:text-white"
        >
          <i className="fab fa-github"></i> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/trevorabrown/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-700"
        >
          <i className="fab fa-linkedin"></i> LinkedIn
        </a>
      </div>
    </footer>
  );
}
