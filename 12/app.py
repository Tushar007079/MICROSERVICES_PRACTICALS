from flask import Flask
import random

app = Flask(__name__)

@app.route('/')
def random_number():
    return f"Random Number: {random.randint(1, 100)}"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
