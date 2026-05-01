from pydantic import BaseModel

class GuessRequest(BaseModel):
    guess: str

class GuessResponse(BaseModel):
    result: list[str]
    correct: bool