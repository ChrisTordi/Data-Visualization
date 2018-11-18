HOW TO RUN
In terminal, get into the final_project folder and type “python3 final_app.py”
From there go to http://0.0.0.0:5000/ in your browser to see the default
visualization. Once you are there you can explore that visualization and pick
your options…


INSTRUCTIONS
Where the data is from
Stack Overflow 2018 Developer Survey: Each year, Stack Overflow sends out a
survey to get a sense of developer preferences, favorite technologies, and
personal information. The resulting csv features 100,000 responders and 130
variables. Variables include: salary, years working, gender, race, location,
favorite and least favorite languages, etc. The original dataset can be found at https://www.kaggle.com/stackoverflow/stack-overflow-2018-developer-survey/home.


FILE DESCRIPTIONS
chooseTwo/Three/Four/Five.html: these load the visualization based on the
number of parameters selected by the user.
final_app.py: the flask app used load the various html files depending on
the number of attributes
final.js: sets up the visualization and contains all the logic for the
checkboxes and submit button
style.css: overrides and adds to the style sheets already in use
d3.parsets.js: Jason Davies code for constructing the parallel sets
d3.parsets.css: Jason Davies css
output_data.csv: the final csv used to make the visualization
create_data.py: the python program used to manipulate the original csv to get
the relevant data in binned format
