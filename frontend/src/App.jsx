import Board from './components/Board'
import Keyboard from './components/Keyboard'

function App() {
  const guesses = [
    { word: 'apple', result: ['G', 'Y', 'X', 'X', 'G'] },
  ]

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h1 className="text-3xl font-bold">Wordle</h1>
      <Board guesses={guesses} />
      <Keyboard onKey={(key) => console.log(key)} />
    </div>
  )
}

export default App
