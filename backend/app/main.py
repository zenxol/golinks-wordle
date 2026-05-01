from fastapi import FastAPI, HTTPException
from app.game import set_new_word, get_word, evaluate_guess
from app.word_service import fetch_random_word, is_valid_word
from app.models import GuessRequest, GuessResponse

app = FastAPI()

@app.get("/")
def health_check():
    return {"status": "ok"}

@app.post("/new-game")
def new_game():
    word = fetch_random_word()
    set_new_word(word)
    return {"message": "new game started"}

@app.get("/answer")
def get_answer():
    return {"word": get_word()}

@app.post("/guess")
def guess(request: GuessRequest):
    if not is_valid_word(request.guess):
        raise HTTPException(status_code=400, detail="Not a valid word")
    result, correct = evaluate_guess(request.guess)
    return GuessResponse(result=result, correct=correct)
