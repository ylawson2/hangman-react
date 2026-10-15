export default function WordDisplay({ word, guesses, reveal }) {
  const visible = [...word].map(letter => reveal || guesses.includes(letter) ? letter : '_')
  return <div className="word" role="group" aria-label={`Word: ${visible.join(' ')}`}>
    {[...word].map((letter, index) => <span key={index} aria-hidden="true" className={`letter-slot ${reveal && !guesses.includes(letter) ? 'missed-letter' : ''}`}>{reveal || guesses.includes(letter) ? letter : '\u00A0'}</span>)}
  </div>
}
