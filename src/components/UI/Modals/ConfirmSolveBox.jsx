import { Dialog } from "@headlessui/react";
const ConfirmSolveBox = ({ isOpen, setIsOpen, confirmSolve }) => {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-30 flex items-center justify-center p-8"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60" />
        <div className="relative max-w-sm p-4 mx-auto bg-white shadow-xl dark:bg-gray-800 rounded-2xl">
          <Dialog.Title
            as="h3"
            className="flex items-center justify-center text-xl font-semibold text-center text-gray-900 dark:text-white"
          >
            <i className="mr-2 fa-regular fa-diamond-exclamation"></i> Confirm
            Action
          </Dialog.Title>
          <div className="mt-4 text-center text-gray-600 dark:text-gray-300">
            <p>
              Are you sure you want to reveal the answers? This cannot be
              undone.
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              className="flex items-center justify-center p-2 text-lg bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:bg-transparent dark:hover:bg-gray-700 dark:text-white"
              onClick={confirmSolve}
            >
              <i className="mr-2 fa-regular fa-eye"></i> Reveal
            </button>
            <button
              type="button"
              className="flex items-center justify-center p-2 text-lg bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100 dark:border-white dark:bg-transparent dark:hover:bg-gray-700 dark:text-white"
              onClick={() => setIsOpen(false)}
            >
              <i className="mr-2 fa-regular fa-times"></i> Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default ConfirmSolveBox;
