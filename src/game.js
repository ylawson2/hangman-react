export const MAX_MISTAKES = 6
export const STAGES = ['noose.png', 'upperbody.png', 'upperandlowerbody.png', '1arm.png', 'botharms.png', '1leg.png', 'Dead.png']
export const WORDS = [
  { word: 'REACT', hint: 'A library for building user interfaces' },
  { word: 'COMPONENT', hint: 'A reusable piece of a user interface' },
  { word: 'BROWSER', hint: 'Where a web application runs' },
  { word: 'FUNCTION', hint: 'A reusable block of JavaScript code' },
  { word: 'VARIABLE', hint: 'A named place to store a value' },
  { word: 'DOCKER', hint: 'A tool used to run applications in containers' },
  { word: 'KEYBOARD', hint: 'An input device used for typing' },
  { word: 'CAMPUS', hint: 'The grounds of a college' },
  { word: 'PYTHON', hint: 'A programming language named after a comedy group' },
  { word: 'NETWORK', hint: 'A group of connected computers' },
  { word: 'DATABASE', hint: 'An organized collection of data' },
  { word: 'JAVASCRIPT', hint: 'The programming language used in this game' },
]
export function chooseWord(previousWord) {
  const available = WORDS.filter(({ word }) => word !== previousWord)
  return available[Math.floor(Math.random() * available.length)]
}
export function getGameState(word, guesses) {
  const wrongLetters = guesses.filter(letter => !word.includes(letter))
  const won = [...word].every(letter => guesses.includes(letter))
  const lost = wrongLetters.length >= MAX_MISTAKES
  return { wrongLetters, won, lost, finished: won || lost, lives: Math.max(0, MAX_MISTAKES - wrongLetters.length) }
}
export function addGuess(word, guesses, input) {
  const letter = input.toUpperCase()
  if (!/^[A-Z]$/.test(letter) || guesses.includes(letter) || getGameState(word, guesses).finished) return guesses
  return [...guesses, letter]
}
