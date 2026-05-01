import random
import os

_valid_words = None
_answer_words = None

def _load_answer_words():
    global _answer_words
    path = os.path.join(os.path.dirname(__file__), "..", "words.txt")
    with open(path) as f:
        _answer_words = list(word.strip().lower() for word in f if word.strip())
    return _answer_words

def _load_valid_words():
    global _valid_words
    path = os.path.join(os.path.dirname(__file__), "..", "allowed_words.txt")
    with open(path) as f:
        _valid_words = set(word.strip().lower() for word in f if word.strip())
    return _valid_words

def fetch_random_word():
    if _answer_words is None:
        _load_answer_words()
    return random.choice(_answer_words)

def get_valid_words():
    if _valid_words is None:
        _load_valid_words()
    return _valid_words

def is_valid_word(word):
    return word.lower() in get_valid_words()
