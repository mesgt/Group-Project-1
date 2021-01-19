$(document).ready(function () {
  var userInput = JSON.parse(localStorage.getItem(userInput)) || [];

  //THESE GLOBAL VARIABLES ONLY USE W/IN RESPONSE FUNCTION \\
  let foodQuantity;
  let foodMeasurement;
  let foodType;
  let date;

  //MODAL INITIALIZATION FUNCTION \\
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

    // CONCATENATE USER UI INPUT PREPARE TO SEND TO API \\
    let foodStringAPI = `${foodQuantity} ${foodMeasurement} ${foodType}`;

    // LOCAL STORAGE \\
    userInput.push(foodStringAPI);
    localStorage.setItem("userInput", JSON.stringify(userInput));

    // NUTRIENTS API AJAX \\
    let queryFoodURL = `https://api.edamam.com/api/nutrition-data?app_id=c502f564&app_key=a522a1a262d4a5a3968b56ede64ba74a&ingr=${foodStringAPI}`;

    //API CALL\\
    $.ajax({
      url: queryFoodURL,
      method: "GET",
    }).then(function (response) {
      confirmResponse(response);

      //ACTIVATE MODAL \\
      if (response.totalWeight === 0) {
        toggleModal();
      }

      //CLEAR FORM FUNCTION CALL \\
      formClear();

      //Second API- recipe. Triggered when user enters new food ingredient.

      let recipeRequest = foodType; 
      console.log(recipeRequest);
      let apiKey1 = "4da9dd4148874160a27f2aee5c61d935"
      let apiKey2 = "3972ed1ffd3e45199211b165635f7657"
      let queryRecipeURL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${recipeRequest}&number=5&limitLicense=${true}&ranking=1&ignorePantry=${true}&apiKey=${apiKey2}`;
      //FIND RECIPE NAME
      $.ajax({
        url: queryRecipeURL,
        method: "GET",
      }).then(function (recipeResponse) {
        var recipeLookUp = recipeResponse[0].title;
        $("#recipeName").text(JSON.stringify(recipeLookUp));
        var recipeID = recipeResponse[0].id; //ID TO LOOK UP RECIPE INSTRUCTIONS
        let findRecipeURL = `https://api.spoonacular.com/recipes/${recipeID}/information?includeNutrition=${false}&apiKey=${apiKey2}`;

        //FIND RECIPE SUMMARY AND INSTRUCTIONS
        $.ajax({
          url: findRecipeURL,
          method: "GET",
        }).then(function (recipeInstructions) {
        //RECIPE SUMMARY
        console.log(recipeInstructions);
        var summaryDisplay = recipeInstructions.summary;
        summaryDisplayMod = JSON.stringify(summaryDisplay);
        summaryDisplayMod = summaryDisplayMod.replace(/"/g,"");
        console.log(summaryDisplayMod);
        $("#recipeSummary").append(summaryDisplayMod); //SET FIELD TO CLEAR BEFORE FUNCTION RUNS. NEED TO EXCLUDE LINKS.
        
        var recipeDisplay = recipeInstructions.instructions;
        recipeDisplayMod = JSON.stringify(recipeDisplay);
        recipeDisplayMod = recipeDisplayMod.replace( /\\n/g, " ");
        recipeDisplayMod = recipeDisplayMod.replace(/"/g,"");
        console.log(recipeDisplayMod);
        $("#recipe").append(recipeDisplayMod); 
        
        var mealImageURL = recipeInstructions.image;
        $("#recipeImage").attr("src", mealImageURL);
        });
      });
    });
  });
  //CLEAR FORM \\
  function formClear() {
    $("#quantity-of-food").value = "";
    $("#measurement").value = "";
    $("#type-of-food").value = "";
  }

  //FUNCTION CARRIES THROUGH RESPONSE OBJECT FROM AJAX \\
  function confirmResponse(response) {
    console.log(response);
    console.log(response.calories);
    console.log(foodQuantity);
  }
});
