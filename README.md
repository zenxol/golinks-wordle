# Definitely Not Wordle

A fullstack Wordle clone built for the GoLinks 2026 Fullstack Internship Project.

**Live Demo:** https://golinks-wordle-three.vercel.app/

**GitHub:** https://github.com/zenxol/golinks-wordle

---

## How to Play

- Guess the secret 5-letter word within 6 tries
- After each guess, tiles flip to reveal feedback:
  - **Green** — correct letter, correct position
  - **Yellow** — correct letter, wrong position
  - **Gray** — letter not in the word
- Use the on-screen keyboard or your physical keyboard
- Click **New Game** to reset at any time

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite), Tailwind CSS |
| Backend | FastAPI (Python) |
| Deployment | Vercel (frontend), Railway (backend) |
| QA | Pytest (Unit tests), Swagger UI (API testing) | 

- Instead of integrating a database or calling external APIs for random guess words / validation check for words, I utilized a general text dictionary of past Wordle words and common 5-letter English words. 

---

## Architecture

```
golinks-wordle/
  backend/
    app/
      main.py          # API routes
      game.py          # core game logic
      word_service.py  # word loading and validation
      models.py        # Pydantic request/response models
    words.txt          # curated answer word list
    allowed_words.txt  # valid guess word list
    tests/
      test_game.py     # unit tests
  frontend/
    src/
      App.jsx          # main game logic and state
      api.js           # backend HTTP calls
      components/
        Board.jsx      # renders 6 guess rows
        Row.jsx        # renders one guess row
        Tile.jsx       # renders one letter tile with flip animation
        Keyboard.jsx   # on-screen keyboard with color feedback
        Background.jsx # mouse spark particle effect
```

---

## Design Decisions

- **Local word lists over external APIs** — Instead of calling external APIs for random words or validation, the backend loads two local text files at startup: a curated list of past Wordle answers (`words.txt`) and a broader dictionary of valid 5-letter English words (`allowed_words.txt`). This eliminates rate limiting, latency, and third-party downtime.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/new-game` | Start a new game with a random word |
| GET | `/answer` | Return the current secret word |
| POST | `/guess` | Submit a guess, returns result and correctness |

---

## Running Locally

**Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

**Tests**
```bash
cd backend
pytest tests/
```

---

## AI Usage

Used Claude AI (Anthropic) as a coding assistant for:
- React component boilerplate (Board, Row, Tile, Keyboard)
- Tailwind CSS styling and UI polish
- Tile flip animation implementation
- Frontend debugging
- Mouse cursor particle effect integration (adapted from [21st.dev](https://21st.dev/community/components/ruixenui/mouse-spark/default))
- README generation

Architecture, design decisions, API design, backend/frontend structure, and unit tests were independently designed and written.
