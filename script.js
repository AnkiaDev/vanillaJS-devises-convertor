import { eur, usd, fch, yen } from "./module/tauxChange.js"; // EDIT tauxChange.js TO ADD NEW DEVISE AND IMPORT HERE /!\

const formElt = document.getElementsByTagName("form");
const inputOne = document.getElementById("inputOne");
const inputTwo = document.getElementById("inputTwo");
const deviseNameOne = document.getElementById("deviseNameOne");
const deviseNameTwo = document.getElementById("deviseNameTwo");
const deviseOne = document.getElementById("deviseOne");
const deviseTwo = document.getElementById("deviseTwo");

// get select choice and return tauxChange object
const deviseChoice = choice => {
  if (choice === "EUR") {
    return eur;
  } else if (choice === "USD") {
    return usd;
  } else if (choice === "FCH") {
    return fch;
  } else if (choice === "YEN") {
    return yen;
  } // ADD NEW DEVISE HERE /!\
};

// Change input label name
const deviseName = choice => {
  if (choice === "EUR") {
    return "Euros";
  } else if (choice === "USD") {
    return "US Dollars";
  } else if (choice === "FCH") {
    return "Francs-Suisse";
  } else if (choice === "YEN") {
    return "Yens";
  } // ADD NEW DEVISE HERE /!\
};

formElt[0].onsubmit = e => {
  e.preventDefault();
};

// Calculate devise result with change rate
const resultDevise = (input, dvs1, dvs2) => {
  return Math.round(input.value * dvs1[dvs2.self] * 100) / 100; // input  * devise de l'input opposé[devise de l'input]
};

let deviseOneChoice = eur; // init select choice
deviseNameOne.textContent = "Euros"; // init input label

// Event when we choose a devise in inputOne select
deviseOne.onchange = () => {
  deviseOneChoice = deviseChoice(deviseOne.value); // Change the change rate reference object in terms of the select choice
  deviseNameOne.textContent = deviseName(deviseOne.value); // Change the input label name in terms of the select choice
  inputTwo.value.length // If there is a value in input two,
    ? (inputOne.value = resultDevise(
        // Calculate the rate,
        inputTwo,
        deviseOneChoice,
        deviseTwoChoice
      ))
    : (inputOne.placeholder = deviseOne.value); // Else, change input placeholder
};

let deviseTwoChoice = usd; // init select choice
deviseNameTwo.textContent = "US Dollars"; // init input label

// Event when we choose a devise in inputOne select
deviseTwo.onchange = () => {
  deviseTwoChoice = deviseChoice(deviseTwo.value); // Change the change rate reference object in terms of the select choice
  deviseNameTwo.textContent = deviseName(deviseTwo.value); // Change the input label name in terms of the select choice
  inputOne.value.length // If there is a value in input One,
    ? (inputTwo.value = resultDevise(
        // Calculate the rate,
        inputOne,
        deviseTwoChoice,
        deviseOneChoice
      ))
    : (inputTwo.placeholder = deviseTwo.value); // Else, change input placeholder
};

inputOne.oninput = () => {
  // Calculate the new result when input value change
  inputTwo.value = resultDevise(inputOne, deviseTwoChoice, deviseOneChoice);
};

inputTwo.oninput = () => {
  // Calculate the new result when input value change
  inputOne.value = resultDevise(inputTwo, deviseOneChoice, deviseTwoChoice);
};
