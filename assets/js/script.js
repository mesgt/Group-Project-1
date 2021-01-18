
$(document).ready(function () {
    let foodStringRequest = "2 cups ice cream";//this variable will need to be global- food user Input
    let queryFoodURL = `https://api.edamam.com/api/nutrition-data?app_id=c502f564&app_key=a522a1a262d4a5a3968b56ede64ba74a&ingr=${foodStringRequest}`;

    $.ajax({
        url: queryFoodURL,
        method: "GET",
    }).then(function (response) {
        console.log(response.calories);
    });


    //Second API- recipe. Triggered when user enters new food ingredient.
    
    let recipeRequest = "beef";//this variable will need to be global- food user Input
    let queryRecipeURL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${recipeRequest}&number=5&limitLicense=${true}&ranking=1&ignorePantry=${true}&apiKey=4da9dd4148874160a27f2aee5c61d935`;
    //FIND RECIPE NAME
    $.ajax({
        url: queryRecipeURL,
        method: "GET",

    }).success(function (recipeResponse) {
        console.log(recipeResponse);
        console.log(recipeResponse[0].title);
        var recipeLookUp = recipeResponse[0].title;
        $("#recipeName").text(JSON.stringify(recipeLookUp));
        var recipeID = recipeResponse[0].id; //ID TO LOOK UP RECIPE INSTRUCTIONS
        let findRecipeURL = `https://api.spoonacular.com/recipes/${recipeID}/information?includeNutrition=${false}&apiKey=4da9dd4148874160a27f2aee5c61d935`;
        
        //FIND RECIPE INSTRUCTIONS
        $.ajax({
            url: findRecipeURL,
            method: "GET",
    
        }).success(function (recipeInstructions) {
        console.log(recipeInstructions);
        console.log(recipeInstructions.summary);
        var recipeDisplay = recipeInstructions.instructions;
        console.log(recipeDisplay);
        $("#recipe").text(JSON.stringify(recipeDisplay));


        // $.ajax({
        //     url: findRecipeURL,
        //     method: "GET",
        // }).then(function (recipeFind) {
        // console.log(recipeFind);
        // console.log(recipeFind.instructions);
        // var recipeDisplay = recipeFind.instructions;
        // $("#recipe").text(JSON.stringify(recipeDisplay));
        // var mealImageURL = recipeFind.image;
        // console.log(mealImageURL);
        // $("#recipeImage").attr("src", mealImageURL);
        // });



        

    });

});

});
