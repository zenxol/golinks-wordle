const ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['ENTER','Z','X','C','V','B','N','M','⌫']
]

function Keyboard({ onKey, usedLetters }) {
  const getColor = (key) => {
    if (usedLetters?.[key] === 'G') return 'bg-emerald-500 text-white border-emerald-500'
    if (usedLetters?.[key] === 'Y') return 'bg-amber-400 text-white border-amber-400'
    if (usedLetters?.[key] === 'X') return 'bg-zinc-600 text-zinc-300 border-zinc-600'
    return 'bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-600 hover:scale-105 active:scale-95'
  }

  const isWide = (key) => key === 'ENTER' || key === '⌫'

  return (
    <div className="flex flex-col gap-1.5 items-center select-none">
      {ROWS.map((row, i) => (
        <div key={i} className="flex gap-1.5">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKey(key)}
              className={`
                ${getColor(key)}
                ${isWide(key) ? 'px-3 text-xs' : 'w-9'}
                h-14 rounded-md border font-bold text-sm
                transition-all duration-150 cursor-pointer
                shadow-md
              `}
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
