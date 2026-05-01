import Row from './Row'

function Board({ guesses }) {
  return (
    <div className="flex flex-col gap-1">
      {Array.from({ length: 6 }).map((_, i) => (
        <Row
          key={i}
          letters={guesses[i]?.word || ''}
          colors={guesses[i]?.result || []}
        />
      ))}
    </div>
  )
}

export default Board
