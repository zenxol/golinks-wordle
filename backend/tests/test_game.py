import pytest
from app.game import set_new_word, evaluate_guess
from app.word_service import is_valid_word

def test_all_correct():
    set_new_word("apple")
    result, correct = evaluate_guess("apple")
    assert result == ["G", "G", "G", "G", "G"]
    assert correct == True

def test_some_yellow():
    set_new_word("apple")
    result, correct = evaluate_guess("elppa")
    assert correct == False

def test_duplicate_letters():
    set_new_word("world")
    result, correct = evaluate_guess("llama")
    assert result[0] == "Y"
    assert result[1] == "X"

def test_invalid_word():
    assert is_valid_word("zzzzz") == False

def test_valid_word():
    assert is_valid_word("crane") == True