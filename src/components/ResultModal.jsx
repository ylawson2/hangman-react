import { useEffect, useRef } from 'react'
export default function ResultModal({ won, word, onNewGame }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    dialog.showModal()
    return () => dialog.close()
  }, [])
  return <dialog ref={dialogRef} className="result-dialog" aria-labelledby="result-title" aria-describedby="result-description" onCancel={event => event.preventDefault()}>
    <span className="result-icon" aria-hidden="true">{won ? '★' : '↻'}</span><span className="eyebrow">ROUND COMPLETE</span>
    <h2 id="result-title">{won ? 'You saved the day!' : 'Out of chances.'}</h2>
    <p id="result-description">{won ? 'Great guessing! You found the word.' : 'Good try. A new word is a fresh start.'}</p>
    <div className="answer">The word was <strong>{word}</strong></div>
    <button type="button" className="button primary" onClick={onNewGame} autoFocus>Play again <span aria-hidden="true">→</span></button>
  </dialog>
}
