let body = document.querySelector("body");

function switchTheme() {
  body.classList.toggle("dark-mode");
}

window.onload = function () {
  let weightInput = document.getElementById("weight");
  let heightInput = document.getElementById("height");

  weightInput.placeholder = "kg";
  heightInput.placeholder = "cm";

  let unitSystemSelect = document.getElementById("unit-system");
  unitSystemSelect.addEventListener("change", function () {
    if (this.value === "imperial") {
      weightInput.placeholder = "lb";
      heightInput.placeholder = "in";
    } else {
      weightInput.placeholder = "kg";
      heightInput.placeholder = "cm";
    }
  });
}

var result = document.getElementById("result");
let form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let selectElements = document.querySelectorAll("[required]");
  let validInput = true;

  selectElements.forEach(function (element) {
    if (element.value === "") {
      validInput = false;
      result.innerHTML = "Please select an option for " + element.previousElementSibling.innerHTML + "<br><br>";
      result.scrollIntoView();
    }
  });

  if (validInput) {
    calculateTDEE();
    result.scrollIntoView();

  }
});

function calculateTDEE() {
  let unitSystem = document.getElementById("unit-system").value;
  let gender = document.getElementById("gender").value;
  let goal = document.getElementById("goal").value;
  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value;
  let age = document.getElementById("age").value;
  let activityLevel = document.getElementById("activity-level").value;

  let kgWeight = 0;
  let cmHeight = 0;

  if (unitSystem === "imperial") {
    kgWeight = weight * 0.45359237;
    cmHeight = height * 2.54;
  } else {
    kgWeight = weight;
    cmHeight = height;
  }

  let BMR = 0;

  if (gender === "male") {
    BMR = 88.36 + (13.4 * kgWeight) + (4.8 * cmHeight) - (5.7 * age);
  } else if (gender === "female") {
    BMR = 447.6 + (9.2 * kgWeight) + (3.1 * cmHeight) - (4.3 * age);
  }

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

  if (goal === "cutting") {
    TDEE -= 500;
  } else if (goal === "bulking") {
    TDEE += 500;
  }

  let protein = 0;
  let carbs = 0;
  let fat = 0;

  if (goal === "cutting") {
    carbs = (TDEE * 0.45) / 4;
    protein = (TDEE * 0.30) / 4;
    fat = (TDEE * 0.25) / 9;
  } else if (activityLevel === "sedendtary" || activityLevel === "light") {
    carbs = (TDEE * 0.45) / 4;
    protein = (TDEE * 0.20) / 4;
    fat = (TDEE * 0.35) / 9;
  } else if (activityLevel === "moderate" || activityLevel === "active") {
    carbs = (TDEE * 0.50) / 4;
    protein = (TDEE * 0.30) / 4;
    fat = (TDEE * 0.20) / 9;
  } else if (activityLevel === "very-active" ) {
    carbs = (TDEE * 0.40) / 4;
    protein = (TDEE * 0.30) / 4;
    fat = (TDEE * 0.30) / 9;
  }

  result.innerHTML = `Your TDEE is: ${TDEE.toFixed(0)} calories/day <br> Protein: ${protein.toFixed(0)}g, Carbs: ${carbs.toFixed(0)}g, Fat: ${fat.toFixed(0)}g`;
}