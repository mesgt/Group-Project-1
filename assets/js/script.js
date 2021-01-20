$(document).ready(function () {
  var userInput = JSON.parse(localStorage.getItem("userInput")) || [];
  var userCalories = JSON.parse(localStorage.getItem("userCalories")) || [];
  applyTable();

  // THESE GLOBAL VARIABLES ONLY USE W/IN RESPONSE FUNCTION \\
  let foodQuantity;
  let foodMeasurement;
  let foodType;




  // MODAL INITIALIZATION FUNCTION \\

  $(".modal").modal();
  function toggleModal() {
      var instance = M.Modal.getInstance($("#modal1"));
      instance.open();
  }

  // SUBMIT EVENT LISTENER \\
  $("#submitFood").on("click", function (event) {
    event.preventDefault();
    var recipeDisplayMod = "";

    // SETTING VARIABLES FOR UI INPUT TO MAKE FOODSTRINGAPI \\
    foodQuantity = $("#quantity-of-food").val().trim();
    foodMeasurement = $("#measurement").val();
    foodType = $("#type-of-food").val().trim();

          //CLEAR FORM FUNCTION CALL \\
          formClear();
    // CONCATENATE USER UI INPUT PREPARE TO SEND TO API \\
    let foodStringAPI = `${foodQuantity} ${foodMeasurement} ${foodType}`;

    // LOCAL STORAGE \\
    userInput.push(foodStringAPI);
    localStorage.setItem("userInput", JSON.stringify(userInput));

    // NUTRIENTS API AJAX \\
    let API_keyEdamam1 = "cbb3cf379bbef53f88722a427517271c";
    let API_IDEdamam1 = "a9074bf7";
    let API_keyEdamam2 = "777f73bfb00d638abe3af718ec0a24c3";
    let API_IDEdamam2 = "4f06cc56";
    let API_keyEdamam3 = "a522a1a262d4a5a3968b56ede64ba74a";
    let API_IDEdamam3 = "c502f564";
    let API_keyEdamam4 = "11f6f2ee2f9abd5dbb0ccd3cf89ad771";
    let API_IDEdamam4 = "df045e0d";
    let queryFoodURL = `https://api.edamam.com/api/nutrition-data?app_id=${API_IDEdamam2}&app_key=${API_keyEdamam2}&ingr=${foodStringAPI}`;

    // API CALL\\
    $.ajax({
      url: queryFoodURL,
      method: "GET",

    }).then(function (response) {
      confirmResponse(response);
      //LOCAL STORAGE FOR CALORIES
      userCalories.push(response.calories);
      localStorage.setItem("userCalories", JSON.stringify(userCalories));
      applyTable();



      // ACTIVATE MODAL \\
      if (nutritionResponse.totalWeight === 0) {
        toggleModal();
      }


      // CLEAR FORM FUNCTION CALL \\
      formClear();


      //Second API- recipe. Triggered when user enters new food ingredient.

      let recipeRequest = foodType;
      let apiKey1 = "4da9dd4148874160a27f2aee5c61d935";
      let apiKey2 = "3972ed1ffd3e45199211b165635f7657";
      let apiKey3 = "e5443e35932544eeaa88e04a12015232";
      let queryRecipeURL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${recipeRequest}&number=5&limitLicense=${true}&ranking=1&ignorePantry=${true}&apiKey=${apiKey3}`;
      //FIND RECIPE NAME
      $.ajax({
        url: queryRecipeURL,
        method: "GET",
      }).then(function (recipeResponse) {
        // console.log(recipe)
        recipeLookUp = JSON.stringify(recipeResponse[0].title);
        recipeLookUp = recipeLookUp.replace(/"/g, "");
        $("#recipeName").text(recipeLookUp);
        var recipeID = recipeResponse[0].id; //ID TO LOOK UP RECIPE INSTRUCTIONS
        let findRecipeURL = `https://api.spoonacular.com/recipes/${recipeID}/information?includeNutrition=${false}&apiKey=${apiKey3}`;

        //FIND RECIPE SUMMARY AND INSTRUCTIONS
        $.ajax({
          url: findRecipeURL,
          method: "GET",
        }).then(function (recipeInstructions) {
          //RECIPE SUMMARY
          var summaryDisplay = recipeInstructions.summary;
          summaryDisplayMod = JSON.stringify(summaryDisplay);
          summaryDisplayMod = summaryDisplayMod.replace(/"/g, "");
          $("#recipeSummary").html(summaryDisplayMod);
          console.log(summaryDisplayMod);

          var recipeDisplay = recipeInstructions.instructions;
          recipeDisplayMod = JSON.stringify(recipeDisplay);
          recipeDisplayMod = recipeDisplayMod.replace(/\\n/g, " ");
          recipeDisplayMod = recipeDisplayMod.replace(/"/g, "");
          $("#recipe").html(recipeDisplayMod);

          var mealImageURL = recipeInstructions.image;
          $("#recipeImage").attr("src", mealImageURL);
        });
      });
    });


    //CLEAR FORM \\
    function formClear() {
      document.getElementById("quantity-of-food").value = "";
      document.getElementById("measurement").value = "";
      document.getElementById("type-of-food").value = "";
    }

    //FUNCTION CARRIES THROUGH RESPONSE OBJECT FROM AJAX \\
    function confirmResponse(response) {
      console.log(response);
      console.log(response.calories);
      console.log(foodQuantity);
    }
  });
  // FUNCTION CARRIES THROUGH RESPONSE OBJECT FROM AJAX \\
  function applyTable() {
    // CLEAR TABLE EACH TIME LOOP RUNS \\
    $("#main-table-header").empty();
    //MAKING HEADERS
    let headerRow = $("<tr>");
      let inputHeader = $("<th>");
      inputHeader.text("User Input");
      let calorieHeader = $("<th>");
      calorieHeader.text("Calories");
      headerRow.append(inputHeader, calorieHeader);
      $("#main-table-header").append(headerRow);

    // LOOP TO BUILD USER INPUT TABLE \\
    for (let i = 0; i < userCalories.length; i++) {
      console.log(i);
      let newRow = $("<tr>");
      let newInput = $("<td>");
      newInput.attr("data-number", i);
      newInput.text(userInput[i]);
      let newInputCalories = $("<td>");
      newInputCalories.attr("data-number", i);
      newInputCalories.text(userCalories[i]);
      newRow.append(newInput, newInputCalories)
      $("#main-table-header").append(newRow);
    }

  }

  //CALORIE GOAL INPUT/SUBMIT/DISPLAY
  $("#submit-goal-btn").on("click", function () {
    const goalInput = $("#calorie-goal-input").val().trim();
    $("#goal-display").text(goalInput);
    $("#calorie-goal-input").val("");
  });
});
