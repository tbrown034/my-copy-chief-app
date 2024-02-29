const Alert = ({ message, type = "info" }) => {
  if (!message) return null;
  const backgroundColors = {
    info: "bg-blue-500",
    error: "bg-red-500",
    success: "bg-green-500",
  };
  return (
    <div
      className={`${backgroundColors[type]} text-white p-3 rounded-lg text-center`}
    >
      {message}
    </div>
  );
};

export default Alert;
