const ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']
export default function LetterKeyboard({ word, guesses, disabled, onGuess }) {
  return <div className="keyboard" role="group" aria-label="Choose a letter">
    {ROWS.map(row => <div className="key-row" key={row}>{[...row].map(letter => {
      const chosen = guesses.includes(letter)
      const result = chosen ? (word.includes(letter) ? 'correct' : 'incorrect') : ''
      return <button type="button" key={letter} className={`key ${result}`} disabled={disabled || chosen} onClick={() => onGuess(letter)} aria-label={`Guess ${letter}${chosen ? `, ${result}` : ''}`}>{letter}</button>
    })}</div>)}
  </div>
}
