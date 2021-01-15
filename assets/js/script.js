
$(document).ready(function () {
  let foodStringRequest = "2 cups ice cream";
  let queryFoodURL = `https://api.edamam.com/api/nutrition-data?app_id=c502f564&app_key=a522a1a262d4a5a3968b56ede64ba74a&ingr=${foodStringRequest}`;

  $.ajax({
    url: queryFoodURL,
    method: "GET",
  }).then(function (response) {
    console.log(response.calories);
  });
});

    
   






    //event listener for submit button
    $("#submitFood").click(function () {
        alert("chicken!");
    });

});

