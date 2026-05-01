function Tile({ letter, color }) {
  const bg = {
    G: 'bg-green-600',
    Y: 'bg-yellow-500',
    X: 'bg-gray-400',
  }[color] || 'bg-white border-2 border-gray-300'

  return (
    <div className={`w-14 h-14 flex items-center justify-center text-2xl font-bold uppercase ${bg} ${color ? 'text-white' : 'text-black'}`}>
      {letter}
    </div>
  )
}

export default Tile
