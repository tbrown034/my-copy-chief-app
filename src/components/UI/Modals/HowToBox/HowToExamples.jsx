import WordExample from "./HowToWordExamples";
const HowToExamples = () => {
  return (
    <div className="flex flex-col gap-2 px-2">
      <p className="pt-2 text-xl font-bold border-t border-black border-opacity-30 ">
        Example
      </p>
      <div>
        <p className=" opacity-55">Guess Area</p>
        <div className="flex justify-around gap-2 p-2 text-sm">
          <div className="flex gap-2 ">
            <div className="flex items-center justify-center h-10 p-2 font-bold border-2 border-gray-400 rounded-lg min-w-10 ">
              Dewey
            </div>
            <div className="flex items-center justify-center h-10 p-2 font-bold bg-green-500 border-2 border-gray-400 rounded-lg dark:bg-green-600 min-w-10 ">
              Defeats
            </div>
            <div className="flex items-center justify-center h-10 p-2 font-bold border-2 border-gray-400 rounded-lg min-w-10 ">
              Truman
            </div>
          </div>
          <div className="flex gap-2 text-sm ">
            <div className="flex items-center justify-center h-10 p-2 font-bold bg-red-500 border-2 border-gray-400 rounded-lg min-w-10">
              X
            </div>
          </div>
        </div>
        <div className="flex justify-around gap-2 p-2 text-sm">
          <div className="flex gap-2 ">
            <div className="flex items-center justify-center h-10 p-2 font-bold bg-green-500 border-2 border-gray-400 rounded-lg min-w-10 dark:bg-green-600">
              Truman
            </div>
            <div className="flex flex-wrap items-center justify-center h-10 p-2 font-bold bg-green-500 border-2 border-gray-400 rounded-lg min-w-10 dark:bg-green-600">
              Defeats
            </div>
            <div className="flex flex-wrap items-center justify-center h-10 p-2 font-bold bg-green-500 border-2 border-gray-400 rounded-lg min-w-10 dark:bg-green-600">
              Dewey
            </div>
          </div>
          <div className="flex gap-2 text-sm ">
            <div className="flex flex-wrap items-center justify-center h-10 p-2 font-bold bg-green-500 border-2 border-gray-400 rounded-lg min-w-10 dark:bg-green-600">
              ✓
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 opacity-55">Word Choices</p>
      <div className="">
        <WordExample />
      </div>
    </div>
  );
};
export default HowToExamples;
