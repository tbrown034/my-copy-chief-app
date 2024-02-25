const HowToBullets = () => {
  return (
    <ul className="flex flex-col list-disc list-inside ">
      <li>
        <b>Select Words:</b> Click on words from the options below to fill in
        your guesses.
      </li>
      <li>
        <b>Auto-Fill:</b> Or use the "Random Guesses" button to automatically
        fill in empty spots with remaining words.
      </li>
      <li>
        <b>Swap Words:</b> To change a guess, click a word in your guess area,
        then click the spot where you want it moved.
      </li>
      <li>
        <b>Complete the Puzzle:</b> Match the correct word order to win.
      </li>
    </ul>
  );
};

export default HowToBullets;
