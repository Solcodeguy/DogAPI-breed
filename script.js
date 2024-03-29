'use strict';

function inputListener() {
    $('#dog-form').on('submit', function(event) {
        $('.dog-image-results').empty();
        event.preventDefault();
        let breedValue = $('#dog-input').val();
        console.log(breedValue);
        pullDogImages(breedValue);
    });
}

function pullDogImages(breedValue) {
    console.log(`This ${breedValue} was passed to the pullDogImages`);
    fetch(`https://dog.ceo/api/breed/${breedValue}/images/random`)

    .then(response => {
        console.log(response);
        return response.json();
    })

    .then(responseJSON => {

        if (responseJSON.status == "error") {

            console.log(responseJSON.status);
            return randomBreed();

        } else if (responseJSON.status == "success") {

            console.log(responseJSON.status);

            return showDogs(responseJSON);

        } else {

            alert("Try Again.");

        }
    })

    .catch(error => console.log(error));
}

function showDogs(responseJSON) {

    console.log("showDogs.");
    $('.dog-image-results').append(`<img src="${responseJSON.message}">`);
}

function randomBreed() {
    console.log("Other option.");
    fetch(`https://dog.ceo/api/breeds/image/random/1`)
        .then(response => response.json())
        .then(responseJson => {
            showOther(responseJson);
        })
        .catch(error => alert("Something went wrong"));
}

function showOther(responseJson) {

    $('.result-notes').html(`Oh no! hit a snag, and can't find that breed. Here's one we like instead!`);

    return $('.dog-image-results').append(`<img src="${responseJson.message}">`);

}

$(function() {
    inputListener();
});