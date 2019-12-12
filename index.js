'use strict';

// Function that handles errors.
function handleErrors(response) {
  if (!response.ok) {
    $(".error").removeClass("hidden");
    $(".error").html(
      `<h2>Breed not found:</h2><p>Try another breed.</p>`
    );
    $(".results").hide();
    $(".error").show();
  }
  return response
}

function handleOK(response) {
  if (response.ok) {
    $(".results").show();
    $(".error").hide();
  }
  return response
}

// Take breedname from input field and pass it into ${x} in the url in fetch.
// Then, run handleErrors function to see if there are any errors. If error exist, write message in DOM.
// If no errors exist, run response that leads to the function displayResults.
function getDogImage() {
  let x = document.getElementById("breedname").value
  fetch(`https://dog.ceo/api/breed/${x}/images/random`)
    .then(handleErrors)
    .then(handleOK)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => console.log(error));
}

// Replace the existing image with the new one(s).
// Remove hidden and display the results section.
function displayResults(responseJson) {
  console.log(responseJson);
  $(".results").removeClass("hidden");
  $(".results").html(
    `<h2>Dog here:</h2><img src="${responseJson.message}" class="results-img">`
  );
}

// Remove default action of submit button. Then run getDogImage function.
function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    getDogImage();
  });
}

$(watchForm());