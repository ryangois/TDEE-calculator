window.onload = function() {
    let weightInput = document.getElementById("weight");
    let heightInput = document.getElementById("height");
  
    // Initial placeholder text
    weightInput.placeholder = "kg";
    heightInput.placeholder = "cm";
  
    let unitSystemSelect = document.getElementById("unit-system");
    unitSystemSelect.addEventListener("change", function() {
      if (this.value === "imperial") {
        weightInput.placeholder = "lb";
        heightInput.placeholder = "in";
      } else {
        weightInput.placeholder = "kg";
        heightInput.placeholder = "cm";
      }
    });
}

function calculateTDEE() {
  let gender = document.getElementById("gender").value;
  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value;
  let age = document.getElementById("age").value;
  let activityLevel = document.getElementById("activity-level").value;
  let unitSystem = document.getElementById("unit-system").value;
  
  // Conversion factor for imperial to metric units
  let kgWeight = 0;
  let cmHeight = 0;
  
  if (unitSystem === "imperial") {
    kgWeight = weight * 0.45359237;
    cmHeight = height * 2.54;
  } else {
    kgWeight = weight;
    cmHeight = height;
  }
  
  // BMR calculation
  let BMR = 0;
  if (gender === "male") {
    BMR = 88.36 + (13.4 * kgWeight) + (4.8 * cmHeight) - (5.7 * age);
  } else if (gender === "female") {
    BMR = 447.6 + (9.2 * kgWeight) + (3.1 * cmHeight) - (4.3 * age);
  }
  
  // TDEE calculation
  let TDEE = 0;
  if (activityLevel === "sedentary") {
    TDEE = BMR * 1.2;
  } else if (activityLevel === "light") {
    TDEE = BMR * 1.375;
  } else if (activityLevel === "moderate") {
    TDEE = BMR * 1.55;
  } else if (activityLevel === "active") {
    TDEE = BMR * 1.725;
  } else if (activityLevel === "very-active") {
    TDEE = BMR * 1.9;
  }
  
  // Macro calculation
  let protein = TDEE * 0.3 / 4;
  let carbs = TDEE * 0.5 / 4;
  let fat = TDEE * 0.2 / 9;
  
  // Display result
  let result = document.getElementById("result");
  result.innerHTML = `Your TDEE is: ${TDEE.toFixed(0)} calories/day <br> Protein: ${protein.toFixed(0)}g, Carbs: ${carbs.toFixed(0)}g, Fat: ${fat.toFixed(0)}g`;
}
