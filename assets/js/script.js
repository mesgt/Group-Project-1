
$(document).ready(function () {
  let foodStringRequest = "2 cups ice cream";
  let queryFoodURL = `https://api.edamam.com/api/nutrition-data?app_id=c502f564&app_key=a522a1a262d4a5a3968b56ede64ba74a&ingr=${foodStringRequest}`;

  $.ajax({
    url: queryFoodURL,
    method: "GET",
  }).then(function (response) {
    console.log(response.calories);
  });


    
   






    //event listener for submit button
    $("#submitFood").click(function () {
        alert("chicken!");
    });

    //Second API- recipe
    let recipeRequest = "rice";//this variable will need to be global- food user Input
    let queryRecipeURL = `https://yummly2.p.rapidapi.com/feeds/search?start=0&maxResult=18&FAT_KCALMax=1000&maxTotalTimeInSeconds=7200&allowedAttribute=diet-lacto-vegetarian%2Cdiet-low-fodmap&q=${recipeRequest}`;
  
    $.ajax({
        "async": true,
        "crossDomain": true,
      url: queryRecipeURL,
      method: "GET",
      "headers": {
        "x-rapidapi-key": "d3e95b7309msh0734a6ab22cb20cp1b5f68jsn85dde42938a0",
        "x-rapidapi-host": "yummly2.p.rapidapi.com"
    }
    }).then(function (response) {
      console.log(response);
      console.log(response.relatedPhrases.recipes[0]);
    });

    });


