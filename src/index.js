
// Add container with dom content loaded
// page loaded

let dogs = []
let breeds = []


document.addEventListener("DOMContentLoaded", function(event) {
  const dogContainer = document.getElementById("dog-image-container")
  const breedsContainer = document.getElementById("dog-breeds")
  const dropdown = document.getElementById("breed-dropdown")

  fetch ("https://dog.ceo/api/breeds/image/random/4")
    .then(function(response) {
    return response.json()
    //taking repsonse and parsing with json
    //take in parsed and return parsed json
    }).then(function(parsed){
    dogs = parsed["message"]
    dogContainer.innerHTML = createHTML(dogs)
    return dogs
  })

  fetch ('https://dog.ceo/api/breeds/list/all')
      .then(function(response) {
      return response.json()
    }).then(function(parsed) {
      breeds = Object.keys(parsed["message"])
      breedsContainer.innerHTML = createBreeds(breeds)
      console.log(breeds);
      return breeds
  })

  // Challenge 3
  breedsContainer.addEventListener('click', e => {
    // console.log(e.target.innerText);
    for (let breed of breeds) {
      if (breed === e.target.innerText) {
        e.target.style = "color: red;"
      } else {
         "color: black;"
      }
    }
  })

  // Challenge 4
  dropdown.addEventListener('change', d => {
    // console.log(d.target.value);         breed 0 is first letter of element
    // innerHTML in
    let filtered = breeds.filter( breed => breed[0] === d.target.value)
    breedsContainer.innerHTML = createBreeds(filtered)

  })

}); //dom content loaded ends
                  // input
function createHTML(input) {
    return input.map (
    url => {
    return `<img src="${url}" alt="dog" height="100" width="100" style="margin: 25px;">`
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
