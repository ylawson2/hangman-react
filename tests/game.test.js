import test from 'node:test'
import assert from 'node:assert/strict'
import { addGuess, chooseWord, getGameState, MAX_MISTAKES, STAGES } from '../src/game.js'
test('correct guesses reveal repeated letters without taking a life', () => {
  const guesses = addGuess('LETTER', [], 't')
  assert.deepEqual(guesses, ['T'])
  assert.equal(getGameState('LETTER', guesses).lives, 6)
  assert.equal([...'LETTER'].filter(letter => guesses.includes(letter)).length, 2)
})
test('duplicate and invalid guesses do not change state', () => {
  const guesses = ['A']
  for (const letter of ['A', 'a', '1', 'Enter', '']) assert.equal(addGuess('REACT', guesses, letter), guesses)
})
test('six wrong guesses lose; five wrong guesses still allow play', () => {
  const guesses = ['B', 'D', 'F', 'G', 'H']
  assert.equal(getGameState('REACT', guesses).finished, false)
  const state = getGameState('REACT', addGuess('REACT', guesses, 'I'))
  assert.equal(state.lost, true)
  assert.equal(state.lives, 0)
  assert.equal(STAGES.length, MAX_MISTAKES + 1)
})
test('guessing every unique letter wins and ends input', () => {
  const guesses = ['L', 'E', 'T', 'R']
  assert.equal(getGameState('LETTER', guesses).won, true)
  assert.equal(addGuess('LETTER', guesses, 'A'), guesses)
})
test('lost rounds ignore further guesses', () => {
  const guesses = ['B', 'D', 'F', 'G', 'H', 'I']
  assert.equal(addGuess('REACT', guesses, 'R'), guesses)
})
test('new rounds always have a different word', () => {
  for (let i = 0; i < 100; i++) assert.notEqual(chooseWord('REACT').word, 'REACT')
})
