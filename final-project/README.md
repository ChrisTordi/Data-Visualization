### HOW TO RUN THE VISUALIZATION
In terminal, get into the final_project folder and type “python3 final_app.py”
From there go to http://0.0.0.0:5000/ in your browser to see the default
visualization. Once you are there you can explore that visualization and pick
a recommended visualization or create your own.


### DATASET
<i>Stack Overflow 2018 Developer Survey:</i> Each year, Stack Overflow sends out a
survey to get a sense of developer preferences, favorite technologies, and
personal information. The resulting csv features 100,000 responders and 130
variables. Variables include: salary, years working, gender, race, location,
favorite and least favorite languages, etc. The original dataset can be found at https://www.kaggle.com/stackoverflow/stack-overflow-2018-developer-survey/home.


### FILE DESCRIPTIONS
* <i>chooseTwo/Three/Four/Five.html:</i> these structure the visualization based on the
number of attributes selected by the user

* <i>final_app.py:</i> the flask app used load the various html files depending on
the number of attributes

* <i>final.js:</i> sets up the visualization and contains all the logic for the
checkboxes and submit button

* <i>style.css:</i> overrides and adds to the style sheets already in use

* <i>d3.parsets.js:</i> Jason Davies' code for constructing the parallel sets with some
modifications made by us

* <i>d3.parsets.css:</i> Jason Davies' css with modifications to the color scheme

* <i>output_data.csv:</i> the final csv used to make the visualization

* <i>create_data.py:</i> the python program used to manipulate the original csv to get
the relevant data in binned format
