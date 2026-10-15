import { useCallback, useEffect, useState } from 'react'
import { addGuess, chooseWord, getGameState } from './game'
import Instructions from './components/Instructions'
import HangmanDisplay from './components/HangmanDisplay'
import WordDisplay from './components/WordDisplay'
import LetterKeyboard from './components/LetterKeyboard'
import ChosenLetters from './components/ChosenLetters'
import ResultModal from './components/ResultModal'
export default function App() {
  const [puzzle, setPuzzle] = useState(() => chooseWord())
  const [guesses, setGuesses] = useState([])
  const { wrongLetters, won, lost, finished, lives } = getGameState(puzzle.word, guesses)
  const guess = useCallback(letter => setGuesses(current => addGuess(puzzle.word, current, letter)), [puzzle.word])
  useEffect(() => {
    function handleKey(event) {
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat || !/^[a-z]$/i.test(event.key)) return
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName) || event.target.isContentEditable) return
      guess(event.key)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [guess])
  function newGame() {
    setPuzzle(current => chooseWord(current.word))
    setGuesses([])
  }
  return <div className="app-shell">
    <header className="header"><a href="./" className="brand" aria-label="Hangman home"><span className="brand-mark" aria-hidden="true">H</span>HANGMAN<span className="brand-period">.</span></a><span className="course-label">FULL STACK CLASS / Y. LAWSON</span></header>
    <main>
      <section className="intro"><div><span className="eyebrow">A LITTLE WORDPLAY</span><h1>Every letter counts.</h1><p>Welcome to Hangman. Can you uncover the hidden word?</p></div><button type="button" className="button secondary" onClick={newGame}><span aria-hidden="true">↻</span> New game</button></section>
      <div className="game-layout">
        <HangmanDisplay mistakes={wrongLetters.length} lives={lives} />
        <section className="play-panel" aria-labelledby="puzzle-title">
          <div className="puzzle-heading"><span className="eyebrow" id="puzzle-title">GUESS THE WORD</span><span className="word-length">{puzzle.word.length} letters</span></div>
          <p className="hint"><strong>Hint</strong> {puzzle.hint}</p>
          <WordDisplay word={puzzle.word} guesses={guesses} reveal={lost} />
          <p className="game-status" role="status">{finished ? (won ? 'Word solved — well played!' : `The word was ${puzzle.word}.`) : guesses.length ? `${guesses.at(-1)} ${puzzle.word.includes(guesses.at(-1)) ? 'is in the word!' : 'is not in the word.'} ${lives} chances remaining.` : 'Pick your first letter to get started.'}</p>
          <LetterKeyboard word={puzzle.word} guesses={guesses} disabled={finished} onGuess={guess} />
          <ChosenLetters word={puzzle.word} guesses={guesses} />
        </section>
      </div><Instructions />
    </main>
    <footer><span>Built with React & Vite</span><span>Think it. Guess it. Solve it.</span></footer>
    {finished && <ResultModal won={won} word={puzzle.word} onNewGame={newGame} />}
  </div>
}
