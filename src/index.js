console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let dogImageContainer
let magic




document.addEventListener('DOMContentLoaded', function(event){

dogImageContainer = document.querySelector('#dog-image-container')
dogBreedContainer = document.querySelector('#dog-breeds')

  fetch( imgUrl)
  .then(response => response.json())
  // .then(response => console.log(response.message))
  .then(response => dogImageDisplay(response))

// ################################

  fetch( breedUrl )
  .then(response => response.json())
  // .then(response => console.log(response.message))
  .then(response => dogBreedDisplay(response))

// #####################################

  document.querySelector('#dog-breeds').addEventListener('click', function(event){
    event.target.style.color = "red"
  })


})


function dogImageDisplay(images) {
  for (let image of images.message){
    // console.log(image)
    dogImageContainer.innerHTML +=
    `<img src= ${image}>`
  }
}

function dogBreedDisplay(breeds) {
  magic = breeds
  for (let breed in breeds.message) {
    // console.log(breed)
    dogBreedContainer.innerHTML +=
    `<li>${breed}</li>`
}




}
