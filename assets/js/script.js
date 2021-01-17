$(document).ready(function () {
  //user searches through api data

  var userInput = JSON.parse(localStorage.getItem(userInput)) || [];

  // SUBMIT EVENT LISTENER \\
  $("#submitFood").on("click", function (event) {
    event.preventDefault();

    // SETTING VARIABLES FOR UI INPUT TO MAKE FOODSTRINGAPI \\
    let foodQuantity = $("#quantity-of-food").val().trim();
    let foodMeasurement = $("#measurement").val().trim();
    let foodType = $("#type-of-food").val().trim();
    // CONCATENATE USER UI INPUT PREPARE TO SEND TO API \\
    let foodStringAPI = `${foodQuantity} ${foodMeasurement} ${foodType}`;
    console.log(foodStringAPI);

    // LOCAL STORAGE \\
    userInput.push(foodStringAPI);
    localStorage.setItem("userInput", JSON.stringify(userInput));

    // NUTRIENTS API AJAX \\
    let queryFoodURL = `https://api.edamam.com/api/nutrition-data?app_id=c502f564&app_key=a522a1a262d4a5a3968b56ede64ba74a&ingr=${foodStringAPI}`;

    $.ajax({
      url: queryFoodURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
    });
  });
});
