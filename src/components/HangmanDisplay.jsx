import { MAX_MISTAKES, STAGES } from '../game'
export default function HangmanDisplay({ mistakes, lives }) {
  return <section className="drawing-panel" aria-label="Hangman progress">
    <div className="panel-top"><span className="eyebrow">THE HANGMAN</span><span className="stage-count">{mistakes} / {MAX_MISTAKES}</span></div>
    <img className="hangman-image" src={`/${STAGES[mistakes]}`} alt={mistakes === 0 ? 'Empty hanging post. No incorrect guesses.' : `Hangman stage ${mistakes} of ${MAX_MISTAKES}. ${lives} chances remaining.`} />
    <div className="lives" aria-label={`${lives} chances left`}>{Array.from({ length: MAX_MISTAKES }, (_, i) => <span key={i} className={i < lives ? 'life active' : 'life'} />)}</div>
    <p className="chances"><strong>{lives}</strong> {lives === 1 ? 'chance' : 'chances'} left</p>
  </section>
}
