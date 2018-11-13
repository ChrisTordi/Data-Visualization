from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

@app.route('/<v1>/<v2>/<v3>/<v4>/<v5>/')
def chooseFive(v1,v2,v3,v4,v5):
    return render_template(
            'chooseFive.html',
            v1=v1,
            v2=v2,
            v3=v3,
            v4=v4,
            v5=v5)


@app.route('/<v1>/<v2>/<v3>/<v4>/')
def chooseFour(v1,v2,v3,v4):
    return render_template(
            'chooseFour.html',
            v1=v1,
            v2=v2,
            v3=v3,
            v4=v4)

@app.route('/<v1>/<v2>/<v3>/')
def chooseThree(v1,v2,v3):
    return render_template(
            'chooseThree.html',
            v1=v1,
            v2=v2,
            v3=v3)


@app.route('/<v1>/<v2>/')
def chooseTwo(v1,v2):
    return render_template(
            'chooseTwo.html',
            v1=v1,
            v2=v2)


@app.route('/')
def default():
    return render_template(
            'chooseFour.html',
            v1='JobSatisfaction',
            v2='Gender',
            v3='OpenSource',
            v4='Hobby')


if __name__=='__main__':
    app.run(debug=True)
