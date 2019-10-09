'use strict';

function displayResults(responseJson, breed) {
    console.log(responseJson.message);
    if (responseJson.message === "Breed not found") {
        $('.results').append(`<h2>Breed not found- please try again.`);
    }
    else {
        $('.results').append(`<h2>Here is a ${breed}: </h2>
        <img src="${responseJson.message}" class=results-img>`);
    }
    $('.results').removeClass('hidden');
}

function getDogImage(breed) {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson, breed))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function watchForm() {
    $('form').on('submit', function() {
        event.preventDefault();
        const breed = $('.js-breed-input').val();
        $('.results').empty();
        getDogImage(breed);
    });
}

function main() {
    console.log('App loaded. Waiting for submit.');
    watchForm();
}

$(main);