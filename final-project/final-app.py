from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/final/')
def freshPrince():
    return render_template(
            'final.html')

if __name__=='__main__':
    app.run(debug=True)
