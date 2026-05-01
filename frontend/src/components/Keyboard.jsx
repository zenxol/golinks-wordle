const ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['ENTER','Z','X','C','V','B','N','M','⌫']
]

function Keyboard({ onKey, usedLetters }) {
  const getColor = (key) => {
    if (!usedLetters) return 'bg-gray-200'
    if (usedLetters[key] === 'G') return 'bg-green-600 text-white'
    if (usedLetters[key] === 'Y') return 'bg-yellow-500 text-white'
    if (usedLetters[key] === 'X') return 'bg-gray-500 text-white'
    return 'bg-gray-200'
  }

  return (
    <div className="flex flex-col gap-1 items-center">
      {ROWS.map((row, i) => (
        <div key={i} className="flex gap-1">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKey(key)}
              className={`${getColor(key)} px-3 py-4 rounded font-bold text-sm ${key === 'ENTER' || key === '⌫' ? 'px-4' : 'w-10'}`}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
