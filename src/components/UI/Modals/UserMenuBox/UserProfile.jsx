export const UserProfile = ({ toggleUserMenu, handleOpenLogIn }) => {
  // Assuming 'user' is the authenticated user object
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="pt-2 text-xl font-bold">Profile</p>
        <p className="text-sm">
          Welcome Back! Below is a summary of your stats to date.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="pt-2 text-xl font-bold">Your Stats</p>
        <div className="flex flex-col gap-2 p-2 border border-black rounded-xl ">
          <p>Wins:</p>
          <p>Clean Wins:</p>
          <p>Hints:</p>
          <p>Guesses:</p>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={toggleUserMenu}
          type="button"
          className="flex items-center justify-center p-2 px-6 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
        >
          <i className="mr-2 fa-regular fa-arrow-left"></i>Back
        </button>
        <button
          onClick={handleOpenLogIn}
          type="button"
          className="flex items-center justify-center p-2 px-6 bg-transparent border border-black shadow-sm rounded-xl hover:bg-gray-100"
        >
          <i className="mr-2 fa-regular fa-sign-out"></i>Log Out
        </button>
      </div>
    </div>
  );
};
