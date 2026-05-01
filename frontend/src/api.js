const BASE_URL = 'https://golinks-wordle-production.up.railway.app'

export async function startNewGame() {
  const res = await fetch(`${BASE_URL}/new-game`, { method: 'POST' })
  return res.json()
}

export async function submitGuess(guess) {
  const res = await fetch(`${BASE_URL}/guess`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guess })
  })
  return res.json()
}

export async function getAnswer() {
  const res = await fetch(`${BASE_URL}/answer`)
  return res.json()
}
