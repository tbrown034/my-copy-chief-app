const HowToBullets = () => {
  return (
    <ul className="flex flex-col gap-2 list-disc list-inside ">
      <li>
        Make a selection from the list of words at the bottom to fill in your
        guesses.
      </li>
      <li>
        Each clickable word will fill the first available spot in the guess
        area.
      </li>
      <li>
        At any point you can also click the "Random Guesses" button to randomly
        fill the remaining guesses from the remaining words.
      </li>
      <li>
        After you made a guess or clicked the "Random Guesses" button, you can
        swap a word by clicking it and then clicking in the guess area where you
        want it to go.
      </li>
    </ul>
  );
};

export default HowToBullets;
