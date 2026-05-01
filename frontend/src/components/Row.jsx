import Tile from './Tile'

function Row({ letters, colors }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Tile key={i} letter={letters?.[i] || ''} color={colors?.[i]} />
      ))}
    </div>
  )
}

export default Row
