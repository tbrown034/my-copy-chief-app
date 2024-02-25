export const Profile = ({ user }) => {
  // Assuming 'user' is the authenticated user object
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="text-lg font-semibold">Profile</h2>
        <p>Email: {user.email}</p>
        <p>Number of Wins: {/* Display user's number of wins here */}</p>
      </div>
    </div>
  );
};
