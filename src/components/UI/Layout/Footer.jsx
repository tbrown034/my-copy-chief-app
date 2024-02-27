export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 py-6 text-gray-700 dark:text-gray-300">
      <div className="text-sm font-medium text-center">
        <span>© 2024 Trevor Brown. All rights reserved. | Copy Chief</span>
      </div>
      <nav className="flex flex-wrap justify-center gap-4 text-sm">
        <a
          href="https://twitter.com/tbrownokc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center transition-colors duration-200 ease-in-out hover:text-blue-500"
          aria-label="Follow on Twitter"
        >
          <i className="mr-1 fab fa-twitter"></i> Twitter
        </a>
        <a
          href="https://github.com/tbrown034"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center transition-colors duration-200 ease-in-out hover:text-gray-900 dark:hover:text-white"
          aria-label="Check out GitHub"
        >
          <i className="mr-1 fab fa-github"></i> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/trevorabrown/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center transition-colors duration-200 ease-in-out hover:text-blue-600"
          aria-label="Connect on LinkedIn"
        >
          <i className="mr-1 fab fa-linkedin"></i> LinkedIn
        </a>
      </nav>
      <a
        href="https://trevorthewebdeveloper.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium transition-opacity duration-200 ease-in-out opacity-75 hover:underline"
        aria-label="Visit my personal developer website"
      >
        Visit my personal developer website!
      </a>
    </footer>
  );
}
