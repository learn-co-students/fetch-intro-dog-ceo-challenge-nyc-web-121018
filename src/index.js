// console.log('%c HI', 'color: firebrick')
let dogs = []
let breeds = []

document.addEventListener("DOMContentLoaded", function(event) {
  const dogContainer = document.getElementById("dog-image-container")
  const breedsContainer = document.getElementById("dog-breeds")
  const dropdown = document.getElementById("breed-dropdown")

  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(function(response) {
    return response.json()
  }).then(function(parsed) {
    dogs = parsed["message"]
    dogContainer.innerHTML = createHTML(dogs)
    return dogs
  })

  fetch('https://dog.ceo/api/breeds/list/all')
    .then(function(response) {
    return response.json()
  }).then(function(parsed) {
    breeds = Object.keys(parsed["message"])
    breedsContainer.innerHTML = createBreeds(breeds)
    console.log(breeds);
    return breeds
  })

  breedsContainer.addEventListener('click', e => {

    for (let breed of breeds) {
      if (breed === e.target.innerText) {
        e.target.style = "color: red;"
      }
    }
  })

  dropdown.addEventListener('change', d => {
    let filtered = breeds.filter( breed => breed[0] === d.target.value)
    breedsContainer.innerHTML = createBreeds(filtered)
  })


}); // DOMContentLoaded ends here


function createHTML(input) {
   return input.map(
    url => {
      return `<img src="${url}" alt="This is a dog picture" height="100" width="100" style="margin: 10px;">`
    }
  ).join("")
}

function createBreeds(input) {
   return input.map(
    breed => {
      return `<li>${breed}</li>`
    }
  ).join("")
}
