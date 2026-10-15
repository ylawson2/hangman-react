export default function ChosenLetters({ word, guesses }) {
  return <section className="chosen" aria-labelledby="chosen-title"><h3 id="chosen-title">Letters already used</h3>
    <div className="chosen-list">{guesses.length ? guesses.map(letter => <span className={`chosen-letter ${word.includes(letter) ? 'hit' : 'miss'}`} key={letter}>{letter}<span className="sr-only">{word.includes(letter) ? ' correct' : ' incorrect'}</span></span>) : <p>Your guesses will appear here.</p>}</div>
  </section>
}
