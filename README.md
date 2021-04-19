[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Cal-Oracle
An easy way to track your calories and stay within your caloric goal.


## Deployed Link

(https://mesgt.github.io/cal-Oracle/)


# Application Details

## Purpose
Get your body swimsuit ready by using the Cal-Oracle App to set your caloric intake goals and track your progress throughout the day.


## Description

Our app allows the user to enter their caloric goal for the day and enter the amount and type of food they eat throughout the day to see how many calories they have consumed. The total calories are obtained from third party API Edamam. Our goal was to create a way for the user to know when they are reaching their limit by the total caloric intake summary background color. The background is green when the user is well within their goal, yellow when they pass 75% of their total goal warning the user they are getting close and red when they have consumed more than they planned. The information is stored in user's Local Storage and can be deleted by the user with the 'clear' button. 

In addition, to encourage the user to eat healthier, each time a food item is entered by the user, a randomly selected recipe is displayed on the page through third party API Spoonacular. The listing will include a short summary of the meal, ingredients, instructions and a picture of this tasty dish.


## Technologies

<li>Materialize (CSS framework)
<li>third party APIs 
<li>Modals


## Future Development

<ul>
    <li>Improve on the overall flow and look of the application.</li>
    <li>Add a progress bar or color coding to indicate percent of calories consumed vs. the daily goal.</li>
    <li>Add an option for the user to delete items off of the consumed calories list.</li>
    <li>Link the hyperlinks provided by the Spoonacular API so the user can visit the websites.</li>
    <li>Look for ways to have recipe option include multiple ingredients from the list.</li>
    <li>Add an option to toggle between standard and metric measurement types.</li>
    <li>Add a weekly summary option where the user can review calories consumed and daily goal status for previous days of the week.</li>
</ul>


## License

Licensed under the [MIT](https://opensource.org/licenses/MIT) license.

## GitHub and Contributors

(https://github.com/mesgt/cal-Oracle)

<br>

[Maria Sargent](https://github.com/mesgt)


## Contributing

I would like to welcome you to work with me on improving this project. Feel free to contact me on gitHub or submit a pull request.

Please note that this project is released with a Contributor Code of Conduct. 
By participating in this project you agree to abide by its terms. 

If you are interested in collaborating with me on this project, please visit (https://www.contributor-covenant.org/version/2/0/code_of_conduct/) to review the latest version of Contributor Covenant. In Node.js, please run the following command "npm install -g covgen" and "covgen '<your_email_address>'". If you have npm 5.x installed you can run npx covgen <your_email_address> instead of installing globally.
