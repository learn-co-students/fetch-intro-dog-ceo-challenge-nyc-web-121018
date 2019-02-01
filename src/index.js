console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let dogImageContainer
let magic
let allBreeds = []
let dogBreedResponse
let searchQuery = ""




document.addEventListener('DOMContentLoaded', function(event){

dogImageContainer = document.querySelector('#dog-image-container')
dogBreedContainer = document.querySelector('#dog-breeds')

  fetch( imgUrl)
  .then(response => response.json())
  // .then(response => console.log(response.message))
  .then(response => dogImageDisplay(response))

// ################################
  function breedApiCall(searchQuery) {
    fetch( breedUrl )
    .then(response => response.json())
    // .then(response => console.log(response.message))
    .then(response => filterDogBreedDisplay(response, searchQuery))

  }
  breedApiCall(searchQuery)

// #####################################

  document.querySelector('#dog-breeds').addEventListener('click', function(event){
    event.target.style.color = "red"
  })

  document.querySelector('#breed-dropdown').addEventListener('change', function(event){
    // console.log(event.target.value)
    while (dogBreedContainer.firstChild) dogBreedContainer.removeChild(dogBreedContainer.firstChild);
    breedApiCall(event.target.value)
  })
}) //end of DOMContentLoaded



function dogImageDisplay(images) {
  for (let image of images.message){
    // console.log(image)
    dogImageContainer.innerHTML +=
    `<img src= ${image}>`
  }
}

function dogBreedDisplay(breeds) {
  for (let breed in breeds.message) {

    dogBreedContainer.innerHTML +=
    `<li>${breed}</li>`
}

}


function filterDogBreedDisplay(breeds,searchQueryString) {
  magic = breeds
  for (let breed in breeds.message) {
    // console.log(breed)
    if (breed.startsWith(searchQueryString)){
    dogBreedContainer.innerHTML +=
    `<li>${breed}</li>`
    allBreeds.push(breed)
  }
}
}
