# pisike-memory-game

Pisike Memory Game is my personal take on the classic memory card game. Features include:

1. Highlighting of moves, rounds played and best score.
2. Buttons for beginning a new game (without resetting rounds played and best score) and for resetting the game.

#technical NOTES:

- The app uses a DOM updating algorithm that only updates the markup where changes were made;
- Practically, it does not rerender the whole <moves__container> div, but only changes the starting values for the Moves, Rounds and Best Score;
- The algorithm is helpful because the innerHTML for the <moves__container> div does not need to be emptied and then generated again, which would cause the buttons to lose their eventListeners;
- The same updating algorithm could be used for longer markups in order to improve app performance.

The application is deployed on Netlify: https://pisike-memory-game.netlify.app/ 
