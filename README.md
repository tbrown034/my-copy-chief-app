NYT Headline Guessing Game
Description
This project is a web-based game where users guess shuffled headlines from the New York Times (NYT). It fetches headlines via the NYT's API, shuffles the words in those headlines, and prompts the user to reconstruct them. The game incorporates elements of learning and fun by challenging users to recall and recognize news headlines.

Features
Article Fetching: Dynamically fetches articles from the New York Times API based on specified criteria (e.g., number of articles, sections).
Word Shuffling: Shuffles the words in the headlines to create a guessing game.
Interactive Guessing: Users interactively place words in the correct order, attempting to reconstruct the original headlines.
Swap and Move: Allows users to swap the positions of words or move them to empty slots, tracking the number of moves.
Win Condition: Checks the user's guesses against the correct headlines, displaying a win message when all headlines are correctly guessed.
UI Feedback: Provides visual feedback for correct guesses, partially correct guesses (right word, wrong headline), and incorrect guesses.
Technologies Used
React (Hooks for state management and effects)
CSS for styling
NYT Top Stories API for fetching headlines
Setup and Installation
Clone the repository:
bash
Copy code
git clone <repository-url>
Navigate to the project directory:
bash
Copy code
cd nyt-headline-guessing-game
Install dependencies:
bash
Copy code
npm install
Set up environment variables:
Create a .env file at the root of your project and add your NYT API key:

env
Copy code
VITE_NYT_API_KEY=your_nyt_api_key_here
Run the project:
bash
Copy code
npm start
This will start the development server, and you should be able to access the game at http://localhost:3000.

How to Play
The game fetches and displays shuffled words from NYT headlines.
Click on the words in the order you believe reconstructs the original headlines.
Use the "Swap" feature to change the positions of words if needed.
Once all headlines are filled, the "Submit" button will become clickable.
Click "Submit" to check your guesses. Correctly placed words will turn green, words that are correct but in the wrong headline will turn yellow, and incorrect guesses will remain unchanged.
The game tracks the number of swaps/moves you make.
Achieve a win by correctly guessing all headlines.
Contributing
Contributions to the NYT Headline Guessing Game are welcome. Please follow these steps to contribute:

Fork the repository.
Create a new branch for your feature or fix.
Commit your changes with clear, descriptive messages.
Push your branch and submit a pull request.
Please ensure your code adheres to the project's coding standards and include any relevant tests.

License

This project is created by Trevor Brown. It is proprietary and not open source. No permission is granted for reuse, modification, or distribution.
