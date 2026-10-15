import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import App from '../src/App.jsx'

beforeEach(() => {
  vi.spyOn(Math, 'random').mockReturnValue(0)
  // jsdom has no native dialog implementation; emulate its open state.
  HTMLDialogElement.prototype.showModal = function () { this.open = true }
  HTMLDialogElement.prototype.close = function () { this.open = false }
})
afterEach(() => { cleanup(); vi.restoreAllMocks() })
const type = letter => fireEvent.keyDown(window, { key: letter })

test('click and keyboard input reveal letters, ignore duplicates, and win', () => {
  render(<App />)
  expect(screen.getByRole('group', {name:'Word: _ _ _ _ _'})).toBeTruthy()
  fireEvent.click(screen.getByRole('button', {name:'Guess R', exact:true}))
  type('r')
  expect(document.querySelectorAll('.chosen-letter').length).toBe(1)
  for (const letter of 'EACT') type(letter)
  expect(screen.getByRole('dialog').textContent).toContain('You saved the day!')
  expect(document.querySelectorAll('.key:enabled').length).toBe(0)
  fireEvent.click(screen.getByRole('button', {name:/Play again/}))
  expect(screen.queryByRole('dialog')).toBeNull()
  expect(document.querySelectorAll('.chosen-letter').length).toBe(0)
  expect(document.querySelectorAll('.letter-slot').length).toBe(9)
})

test('wrong guesses advance all images and produce a loss; reset starts fresh', () => {
  render(<App />)
  const stages = ['upperbody.png', 'upperandlowerbody.png', '1arm.png', 'botharms.png', '1leg.png', 'Dead.png']
  for (const [i, letter] of [...'BDFGHI'].entries()) {
    type(letter)
    expect(document.querySelector('.hangman-image').getAttribute('src')).toBe('/' + stages[i])
    expect(document.querySelector('.chances').textContent).toContain(String(5-i))
  }
  expect(screen.getByRole('dialog').textContent).toContain('Out of chances.')
  expect(screen.getByRole('dialog').textContent).toContain('REACT')
  expect(screen.getByRole('group', {name:'Word: R E A C T'})).toBeTruthy()
  type('R')
  expect(document.querySelectorAll('.chosen-letter').length).toBe(6)
  fireEvent.click(screen.getByRole('button', {name:/Play again/}))
  type('Z')
  fireEvent.click(screen.getByRole('button', {name:/New game/}))
  expect(document.querySelectorAll('.chosen-letter').length).toBe(0)
  expect(document.querySelector('.hangman-image').getAttribute('src')).toBe('/noose.png')
  expect(document.querySelector('.chances').textContent).toContain('6')
})
