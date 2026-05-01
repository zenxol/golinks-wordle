import requests

def fetch_random_word():
    response = requests.get("https://random-word-api.herokuapp.com/word?length=5")
    return response.json()[0]