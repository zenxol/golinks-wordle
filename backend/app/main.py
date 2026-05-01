from fastapi import FastAPI
from app.game import set_new_word, get_word, evaluate_guess
from app.word_service import fetch_random_word
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
    result, correct = evaluate_guess(request.guess)
    return GuessResponse(result=result, correct=correct)
