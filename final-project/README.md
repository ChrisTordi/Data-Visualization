### HOW TO RUN THE VISUALIZATION
In terminal, get into the final_project folder and type “python3 final_app.py”
From there go to http://0.0.0.0:5000/ in your browser to see the default
visualization. Once you are there you can explore that visualization and pick
a recommended visualization or create your own.


### DATASET
_Stack Overflow 2018 Developer Survey:_ Each year, Stack Overflow sends out a
survey to get a sense of developer preferences, favorite technologies, and
personal information. The resulting csv features 100,000 responders and 130
variables. Variables include: salary, years working, gender, race, location,
favorite and least favorite languages, etc. The original dataset can be found at https://www.kaggle.com/stackoverflow/stack-overflow-2018-developer-survey/home.


### FILE DESCRIPTIONS
* _chooseTwo/Three/Four/Five.html:_ these structure the visualization based on the
number of attributes selected by the user

* _final_app.py:_ the flask app used load the various html files depending on
the number of attributes

* _final.js:_ sets up the visualization and contains all the logic for the
checkboxes and submit button

* _style.css:_ overrides and adds to the style sheets already in use

* _d3.parsets.js:_ Jason Davies' code for constructing the parallel sets with some
modifications made by us

* _d3.parsets.css:_ Jason Davies' css with modifications to the color scheme

* _output_data.csv:_ the final csv used to make the visualization

* _create_data.py:_ the python program used to manipulate the original csv to get
the relevant data in binned format
