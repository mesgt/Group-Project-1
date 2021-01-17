$(document).ready(function () {
  //user searches through api data
  var userInput = JSON.parse(localStorage.getItem(userInput)) || [];
  $("#submitFood").on("click", function (event) {
    event.preventDefault();
    var foodItem = $("#search").val();
    //console.log(foodItem);
    userInput.push(foodItem);
    localStorage.setItem("userInput", JSON.stringify(userInput));
    function renderButtons() {
      $("#foodList").empty();
      for (var i = 0; i < foodItem.length; i++) {
        var addList = $("<li>");
        addList.addClass("foodItem");
        var foodButton = $("<button>");
        foodButton.addClass("btn rounded");
        foodButton.text(foodItem[i]);
      }
    }
    function foodStringRequest() {
      let queryFoodURL = `https://api.edamam.com/api/nutrition-data?app_id=c502f564&app_key=a522a1a262d4a5a3968b56ede64ba74a&ingr=${foodItem}`;

      $.ajax({
        url: queryFoodURL,
        method: "GET",
      }).then(function (response) {
        //console.log(response);
        $("#foodList").text(response.ingredients[0].text);
      });
    }
    foodStringRequest();
    renderButtons();
  });

  //console.log(userInput);
});
