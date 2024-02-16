const HowToExamples = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <div>
        <p className="text-2xl font-bold ">Examples</p>
        <p className="text-xl">See Below for a few exapmples.</p>
      </div>

      <div className="flex justify-center gap-4 p-2">
        <div className="flex gap-2">
          <div className="flex flex-wrap items-center justify-center h-20 p-2 font-bold border-2 border-gray-400 rounded-lg ">
            Dewey
          </div>
          <div className="flex flex-wrap items-center justify-center p-2 font-bold bg-green-500 border-2 border-gray-400 rounded-lg dark:bg-green-600">
            Defeats
          </div>
          <div className="flex flex-wrap items-center justify-center p-2 font-bold border-2 border-gray-400 rounded-lg ">
            Truman
          </div>
        </div>
        <div>
          <div className="flex flex-wrap items-center justify-center h-20 p-4 font-bold bg-red-500 border-2 border-gray-400 rounded-lg">
            X
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 p-2">
        <div className="flex gap-2 ">
          <div className="flex flex-wrap items-center justify-center h-20 p-2 font-bold bg-green-500 border-2 border-gray-400 rounded-lg black:bg-green-600 ">
            Truman
          </div>
          <div className="flex flex-wrap items-center justify-center p-2 font-bold bg-green-500 border-2 border-gray-400 rounded-lg dark:bg-green-600">
            Defeats
          </div>
          <div className="flex flex-wrap items-center justify-center p-2 font-bold bg-green-500 border-2 border-gray-400 rounded-lg justify-centerp-2 dark:bg-green-600">
            Dewey
          </div>
        </div>
        <div>
          <div className="flex flex-wrap items-center justify-center h-20 p-4 font-bold bg-green-500 border-2 border-gray-400 rounded-lg ">
            ✓
          </div>
        </div>
      </div>
    </div>
  );
};
export default HowToExamples;
