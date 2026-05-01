function Tile({ letter, color }) {
  const styles = {
    G: 'bg-emerald-500 border-emerald-500 text-white scale-105',
    Y: 'bg-amber-400 border-amber-400 text-white',
    X: 'bg-zinc-600 border-zinc-600 text-white',
  }

  const base = styles[color] || (letter
    ? 'bg-transparent border-2 border-zinc-400 text-white'
    : 'bg-transparent border-2 border-zinc-700 text-white')

  return (
    <div className={`w-14 h-14 flex items-center justify-center text-2xl font-bold uppercase border-2 rounded-sm transition-all duration-300 ${base}`}>
      {letter}
    </div>
  )
}

export default Tile
