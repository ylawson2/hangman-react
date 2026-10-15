# Hangman

**Author:** Yeshua Lawson  
**Course:** Full Stack Development

A React word-guessing game based on the supplied paper prototype. Choose letters to uncover a hidden word before six incorrect guesses complete the hangman. The project was scaffolded from the command line with Vite's React JavaScript template.

## Features

- Welcome message and visible instructions.
- Random word selection from 12 words, each with a hint.
- Dashes representing hidden letters; correct guesses reveal every occurrence.
- Clickable A–Z keyboard and physical keyboard support.
- Chosen-letter history with correct and incorrect guesses marked separately.
- Seven supplied PNG images: the starting post plus six incorrect-guess stages.
- Chances remaining and current stage counters.
- New Game button that clears guesses and selects a different word.
- Win/loss popup showing the answer and a Play Again button.
- Duplicate guesses and guesses after a finished game are ignored.
- Responsive layout, labeled controls, keyboard focus indicators, live feedback, and a native modal dialog.

## Requirements

Choose either Docker or local Node.js:

- **Docker:** Docker Desktop with Docker Compose installed and running.
- **Local:** Node.js **24 LTS** and npm. Node 24 matches the Dockerfile. Node 18 is too old for this Vite version.

Dependencies are recorded in `package.json` and pinned by `package-lock.json`.

## Run with Docker (recommended for the assignment)

1. Unzip the project.
2. Open a terminal inside the `hangman-react` folder, where `Dockerfile` and `docker-compose.yml` are located.
3. Run:

```bash
docker compose up --build
```

4. Open **http://localhost:5173** in a browser.
5. Press **Control+C** to stop. Remove the stopped container and network with:

```bash
docker compose down
```

After editing source files, run `docker compose up --build` again. The Compose setup copies source into the image; it does not mount your computer's files.

### Run Docker without Compose

```bash
docker build -t lawson-hangman .
docker run --rm -p 5173:5173 lawson-hangman
```

The Dockerfile installs locked dependencies, verifies a production build, then runs Vite on `0.0.0.0:5173` so the mapped port is reachable. This configuration is for coursework and local demonstration.

## Run locally

From inside `hangman-react`:

```bash
npm ci
npm run dev
```

Open the URL printed in the terminal, normally **http://localhost:5173**. Press **Control+C** to stop.

## How to play

1. Read the hint and look at the word's blank spaces.
2. Click a letter or type A–Z. A correct guess reveals all matching letters and costs no chance.
3. An incorrect guess moves the illustration forward and uses one chance.
4. Find every letter to win. Six incorrect guesses end the round.
5. Use **Play Again** in the result popup, or **New Game** during play, to start over.

### Prototype and image mapping

The paper prototype describes six body-part steps and ends the game at the second leg. The assignment's “for 5 lives you need 6 photos” is an example of the image count. This implementation follows the prototype's **six chances**, with **seven image states**.

The instructor's artwork groups some body parts together. It is used unchanged in the following order rather than claiming each image is exactly one anatomical addition:

| Incorrect guesses | Supplied image |
| --- | --- |
| 0 | `noose.png` |
| 1 | `upperbody.png` |
| 2 | `upperandlowerbody.png` |
| 3 | `1arm.png` |
| 4 | `botharms.png` |
| 5 | `1leg.png` |
| 6 (loss) | `Dead.png` |

## Project structure

```text
hangman-react/
  public/                 Supplied hangman PNGs
  src/
    components/
      Instructions.jsx    Welcome rules and instructions
      HangmanDisplay.jsx  Current image and remaining chances
      WordDisplay.jsx     Hidden and revealed letters
      LetterKeyboard.jsx  Clickable alphabet buttons
      ChosenLetters.jsx   Guess history
      ResultModal.jsx     Win/loss popup and Play Again
    App.jsx               State, game coordination, keyboard input
    game.js               Word list and pure game rules
    index.css             Responsive styles
    main.jsx              React entry point
  tests/game.test.js      Game-rule tests
  tests/ui.test.jsx        React interaction tests
  Dockerfile
  docker-compose.yml
  package.json
  package-lock.json
  vite.config.js
  index.html              Vite HTML entry point
```

Only the required images from `public.zip` were copied. The archive's old `public/index.html` and manifest are not used because Vite's HTML entry belongs in the project root.

## React principles used

- **Components:** Each main UI responsibility has its own function component.
- **Props:** `App` passes data and callback functions to children.
- **State:** `useState` tracks the selected puzzle and guessed letters.
- **Derived values:** Wrong guesses, remaining chances, win, and loss are calculated from state rather than stored separately.
- **Events:** Buttons and keyboard events call the same guess handler.
- **Immutable updates:** A valid guess returns a new array using spread syntax.
- **Conditional rendering:** The result popup appears only after a win or loss.
- **Lists and keys:** Letters and history entries are rendered with stable keys.
- **Effects and refs:** The keyboard listener is cleaned up, and the native dialog opens when a round ends.

The exact chapter 2 text was not supplied; these are standard introductory React patterns.

## Validation

```bash
npm test
npm run lint
npm run build
```

The six game-rule tests cover repeated letters, invalid and duplicate input, the six-mistake boundary, win/loss input blocking, image count, and avoiding the same word on the next round. Two React component tests run in jsdom and check clicking, keyboard input, both result popups, all image paths, and resets. Native dialog methods are emulated in jsdom; these tests do not replace real browser checks.

To preview the production build locally:

```bash
npm run build
npm run preview
```

Open the URL printed by Vite. `npm run preview` is a local preview server.

### Manual checklist

- A fresh round has an empty post, blank letters, and six chances.
- A correct letter reveals every match without consuming a chance.
- An incorrect letter advances the image exactly once.
- Clicking or typing an already chosen letter changes nothing.
- All letters guessed correctly produces the win popup.
- Six wrong letters produces the loss popup and reveals the answer.
- Play Again closes the popup, clears the history, and selects a different word.
- New Game resets an unfinished round.
- The page fits both a desktop and a phone screen.

**Validation limitations:** All eight automated tests, lint, and the production build passed. Docker is not installed in the build environment, so the container could not be executed here. A browser executable could not be downloaded, so visual and browser interaction checks remain manual. Run `docker compose up --build` on your computer and follow the manual checklist before submission.

## Troubleshooting

- **Docker daemon unavailable:** Open Docker Desktop and wait for it to finish starting.
- **Port 5173 already in use:** Stop the other application, or change Compose's host mapping to `"5174:5173"` and open http://localhost:5174.
- **Vite reports an unsupported Node version:** Install Node 24 LTS or use Docker.
- **Blank page after double-clicking HTML:** Use the Vite or Docker commands. The React source is not intended to run through `file://`.
- **Images do not appear:** Keep the `public` folder and image filenames, including capitalization, unchanged.

## AI contribution

OpenAI ChatGPT/Codex assisted with implementing the React components, game rules, styling, tests, Docker configuration, and documentation. Assignment requirements, the paper prototype, and hangman artwork were supplied by the user. This disclosure describes the assistance used; compare it with your instructor's required AI-contribution format before submission. The previous homework's disclosure template and Docker files were not supplied.

## Support and contributions

For changes, start with `src/game.js` for words and rules or `src/index.css` for appearance. Run the validation commands after making changes. This is a class project with no external support service.

## Roadmap

Possible future additions include word categories, difficulty settings, and a score history. They are not part of the current version.

## Credits and license

- Author: Yeshua Lawson.
- Hangman artwork: supplied in the assignment's `public.zip`; ownership and redistribution terms were not provided.
- React and Vite are third-party dependencies under their respective licenses.
- No additional license is granted for this coursework or the supplied artwork.

## References

- [Vite getting started guide](https://vite.dev/guide/)
- [React learning guide](https://react.dev/learn)
- [Make a README](https://www.makeareadme.com/)
