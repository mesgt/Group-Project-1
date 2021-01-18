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

    // SETTING VARIABLES FOR UI INPUT TO MAKE FOODSTRINGAPI \\
    foodQuantity = $("#quantity-of-food").val().trim();
    foodMeasurement = $("#measurement").val();
    foodType = $("#type-of-food").val().trim();
    date = document.getElementById("selected-date");
    console.log(date.value);

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
    });
  });

  //CLEAR FORM \\
  function formClear() {
    document.getElementById("quantity-of-food").value = "";
    document.getElementById("measurement").value = "";
    document.getElementById("type-of-food").value = "";
    document.getElementById("selected-date").value = "";
  }

  //FUNCTION CARRIES THROUGH RESPONSE OBJECT FROM AJAX \\
  function confirmResponse(response) {
    console.log(response);
    console.log(response.calories);
    console.log(date.value);
    console.log(foodQuantity);
  }
});
