const body = document.querySelector("body");

const switchTheme = () => {
  body.classList.toggle("dark-mode");
}

window.onload = () => {
  const weightInput = document.getElementById("weight");
  const heightInput = document.getElementById("height");
  const feetInput = document.getElementById("feet");
  const inchesInput = document.getElementById("inches");

  weightInput.placeholder = "";
  heightInput.placeholder = "";
  feetInput.style.display = "none";
  inchesInput.style.display = "none";

  let unitSystemSelect = document.getElementById("unit-system");
  unitSystemSelect.addEventListener("change", function () {
    if (this.value === "imperial") {
      weightInput.placeholder = "lb";
      heightInput.style.display = "none";
      feetInput.style.display = "inline-block";
      inchesInput.style.display = "inline-block";
    } else {
      weightInput.placeholder = "kg";
      heightInput.placeholder = "cm";
      heightInput.style.display = "inline-block";
      feetInput.style.display = "none";
      inchesInput.style.display = "none";
    }
  });
}

let result = document.getElementById("result");
let form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let selectElements = document.querySelectorAll("[required]");
  let validInput = true;

  selectElements.forEach((element) => {
    if (element.value === "") {
      validInput = false;
      result.innerHTML = `Please select an option for  ${element.previousElementSibling.innerHTML}<br><br>`;
      result.scrollIntoView();
    }
  });

  if (validInput) {
    calculateTDEE();
    result.scrollIntoView();

  }
});

const calculateTDEE = () => {
  const unitSystem = document.getElementById("unit-system").value;
  const gender = document.getElementById("gender").value;
  const goal = document.getElementById("goal").value;
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;
  const feet = document.getElementById("feet");
  const inches = document.getElementById("inches");
  const age = document.getElementById("age").value;
  const activityLevel = document.getElementById("activity-level").value;

  let kgWeight = 0;
  let cmHeight = 0;

  if (unitSystem === "imperial") {
    kgWeight = weight * 0.45359237;
    cmHeight = (parseInt(feet.value) * 12 + parseInt(inches.value)) * 2.54;
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
  } else if (activityLevel === "sedentary" || activityLevel === "light") {
    carbs = (TDEE * 0.45) / 4;
    protein = (TDEE * 0.20) / 4;
    fat = (TDEE * 0.35) / 9;
  } else if (activityLevel === "moderate" || activityLevel === "active") {
    carbs = (TDEE * 0.50) / 4;
    protein = (TDEE * 0.30) / 4;
    fat = (TDEE * 0.20) / 9;
  } else if (activityLevel === "very-active") {
    carbs = (TDEE * 0.40) / 4;
    protein = (TDEE * 0.30) / 4;
    fat = (TDEE * 0.30) / 9;
  }

  result.innerHTML = `Your TDEE is: ${TDEE.toFixed(0)} calories/day <br> Protein: ${protein.toFixed(0)}g, Carbs: ${carbs.toFixed(0)}g, Fat: ${fat.toFixed(0)}g`;
}
