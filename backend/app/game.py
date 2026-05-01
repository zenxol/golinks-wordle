secret_word = ""
number_attempts = 0

def set_new_word(word):
    global secret_word
    global number_attempts
    secret_word = word
    number_attempts = 0
    

def get_word():
    return secret_word

def evaluate_guess(guess):
    result = ["X", "X", "X", "X", "X"]
    remaining = list(secret_word)

    for i in range(5):
        if guess[i] == secret_word[i]:
            result[i] = "G"
            remaining.remove(guess[i])
    
    for i in range(5):
        if result[i] == "G":
            continue
        if guess[i] in remaining:
            result[i] = "Y"
            remaining.remove(guess[i])
    
    correct = (guess == secret_word)
    return result, correct