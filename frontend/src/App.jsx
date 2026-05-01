import { useState, useEffect, useCallback } from 'react'
import Board from './components/Board'
import Keyboard from './components/Keyboard'
import { startNewGame, submitGuess, getAnswer } from './api'

function App() {
  const [guesses, setGuesses] = useState([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState('')
  const [usedLetters, setUsedLetters] = useState({})
  const [answer, setAnswer] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const [revealedAnswer, setRevealedAnswer] = useState('')

  useEffect(() => {
    newGame()
  }, [])

  async function newGame() {
    await startNewGame()
    setGuesses([])
    setCurrentGuess('')
    setGameOver(false)
    setMessage('')
    setUsedLetters({})
    setAnswer('')
    setShowAnswer(false)
    setRevealedAnswer('')
  }

  async function toggleAnswer() {
    if (!showAnswer) {
      const ans = await getAnswer()
      setRevealedAnswer(ans.word)
    }
    setShowAnswer(prev => !prev)
  }

  const handleKey = useCallback(async (key) => {
    if (gameOver) return

    if (key === '⌫' || key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1))
      return
    }

    if (key === 'ENTER' || key === 'Enter') {
      if (currentGuess.length !== 5) {
        setMessage('Word must be 5 letters')
        return
      }
      setMessage('')
      const data = await submitGuess(currentGuess.toLowerCase())
      if (data.detail) {
        setMessage(data.detail)
        return
      }
      const newGuess = { word: currentGuess, result: data.result }
      
      setGuesses(prev => [...prev, newGuess])
      setUsedLetters(prev => {
        const updated = { ...prev }
        currentGuess.split('').forEach((letter, i) => {
          const l = letter.toUpperCase()
          if (updated[l] !== 'G') updated[l] = data.result[i]
        })
        return updated
      })
      if (data.correct) {
        setMessage('You win!')
        setGameOver(true)
      } else if (guesses.length + 1 >= 6) {
        const ans = await getAnswer()
        setAnswer(ans.word)
        setMessage(`Game over! The word was ${ans.word}`)
        setGameOver(true)
      }
      setCurrentGuess('')
      return
    }

    if (/^[a-zA-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key.toUpperCase())
    }
  }, [gameOver, currentGuess, guesses])

  useEffect(() => {
    const handler = (e) => handleKey(e.key)
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleKey])

  const displayGuesses = [
    ...guesses,
    ...(guesses.length < 6 && !gameOver ? [{ word: currentGuess, result: [] }] : []),
    ...Array(Math.max(0, 6 - guesses.length - (gameOver ? 0 : 1))).fill({ word: '', result: [] })
  ]

    return (
    <div className="flex flex-col items-center gap-6 p-8 min-h-screen bg-white">
      <h1 className="text-3xl font-bold tracking-widest">WORDLE</h1>
      {message && <p className="text-lg font-semibold">{message}</p>}
      <Board guesses={displayGuesses} />
      <Keyboard onKey={handleKey} usedLetters={usedLetters} />
      <button onClick={newGame} className="mt-4 px-6 py-2 bg-black text-white rounded font-bold">
        New Game
      </button>
      <button onClick={toggleAnswer} className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm">
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </button>
      {showAnswer && <p className="text-sm text-gray-500 uppercase tracking-widest">Answer: {revealedAnswer}</p>}
    </div>
  )
}

export default App
