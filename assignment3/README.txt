Authors: Eva Grench and Chris Tordi
Date: 10/8/18


Dataset:

We used the dataset the assignment provided us. The data is related to the
Challenger incident and can be found here:

https://drive.google.com/file/d/0B8Yk1WkphajjZmlYUmN4YVlsU00/view


How to view websites:

To view the SPLOM visualization, open SPLOM.html
To view the parallel coordinates visualization, open ParallelCoordinates.html


How to read visualizations:

SPLOM: The SPLOM visualization we made was based on the example provided in the
assignment. There are labels along the diagonal and every scatterplot that is
in the same row and column have that variable as an axis. For each scatterplot
that is in the same column as a given variable will have that variable as the
x-axis. For scatterplots in the same row, it will be the y-axis.

We included the interactions specified in the assignment. When hovering over a
point a tooltip with the corresponding flight index pops up next to it.
Additionally, every point throughout the SPLOM that does not share that flight
index turns grey. This helps highlight the relevant points. We chose to vary
luminance rather than change color because we felt it was less distracting and
did a better job of distinguishing those points.

When clicking a point, it changes all the points with the same flight index to
red. We chose red because it was very different from black and grey and is easy
pick out on the white background.


Parallel Coordinates: Our parallel coordinates visualization is made up of 5
vertical bar. Each bar represents a column from our csv file with points placed
along each bar according to their respective values. The lines serve to relate
multiple data points from the same flight to allow viewers to discern
relationships between the data.

Hovering over a line highlights each line red and displays a tooltip for that
specific flight. Moving the cursor off of the line will return the color to
blue. Clicking a line will toggle each line for that flight and turn those lines
red and increase line thickness. This will persist until one of the lines
associated with that flight is clicked again.

The animations and interactions allow viewers to easily see relationships
within a flight and compared to other flights. The coloring scheme also makes
flights that are hovered over "pop-out"
