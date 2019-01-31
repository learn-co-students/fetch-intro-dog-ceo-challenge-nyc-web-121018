console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let dogImageContainer





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
  .then(response => dogBreedDisplay(response))


})


function dogImageDisplay(images) {
  for (let image of images.message){
    // console.log(image)
    dogImageContainer.innerHTML +=
    `<img src= ${image}>`
  }
}

function dogBreedDisplay(images) {
  for (let image of images.message){
    dogBreedContainer.innerHTML +=
    `<li></li>`
  }
}
