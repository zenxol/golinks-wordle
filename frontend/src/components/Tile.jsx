import { useState, useEffect } from 'react'

function Tile({ letter, color, index = 0 }) {
  const [isFlipping, setIsFlipping] = useState(false)
  const [showColor, setShowColor] = useState(false)

  useEffect(() => {
    if (color) {
      const delay = index * 300
      const t1 = setTimeout(() => setIsFlipping(true), delay)
      const t2 = setTimeout(() => setShowColor(true), delay + 250)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    } else {
      setIsFlipping(false)
      setShowColor(false)
    }
  }, [color, index])

  const colorClass = showColor ? {
    G: 'bg-emerald-500 border-emerald-500',
    Y: 'bg-amber-400 border-amber-400',
    X: 'bg-zinc-600 border-zinc-600',
  }[color] || '' : ''

  const baseClass = letter
    ? 'border-zinc-400'
    : 'border-zinc-700'

  return (
    <div
      className={`w-14 h-14 flex items-center justify-center text-2xl font-bold uppercase border-2 rounded-sm text-white transition-colors duration-100 ${colorClass || `bg-transparent ${baseClass}`} ${isFlipping ? 'tile-flip' : ''}`}
    >
      {letter}
    </div>
  )
}

export default Tile
