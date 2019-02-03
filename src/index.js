console.log('%c HI', 'color: firebrick')

let betterBreedList = []
//by making this global we can make it filterable
// not sure if this is best practice, but once the UI elements
// of the page are accessible to the user, the list will be built

document.addEventListener("DOMContentLoaded", ()=>{

//getting the container for the images and the list for the breeds
  let dogImageContainer = document.querySelector("#dog-image-container")
  let dogBreedList = document.querySelector("#dog-breeds")
  let breedDropdown = document.querySelector("#breed-dropdown")

//making the image fetch, sending parsed results to showAllDogImages()
  fetch (`https://dog.ceo/api/breeds/image/random/4`)
  .then(response => response.json())
  //  .then(parsed => console.log(parsed.message))
  .then(parsed => showAllDogImages(parsed.message))

//making the breed fetch, sending parsed results to make a specific breed list
// and then afterwatrds to showAllDogBreeds() to render
  fetch(`https://dog.ceo/api/breeds/list/all`)
  .then(response => response.json())
  //  .then(parsed => console.log(parsed.message))
  .then(parsed => makeBetterBreedList(parsed.message))
  .then(improvedList => showAllDogBreeds(improvedList))

  function showAllDogImages(images){
    dogImageContainer.innerHTML += images.map(showDogImage).join("")
  }

  function showAllDogBreeds(allBreeds){
    dogBreedList.innerHTML += allBreeds.map(showDogBreed).join("")
  }

  dogBreedList.addEventListener("click", function(event){
    if(event.target.tagName === "LI"){
      console.log(event)
      console.log(event.target.innerHTML)
      event.target.style.color = "aquamarine"
    }
  })

  breedDropdown.addEventListener("change", function(event){
    // our filter function has to get the value and re-render the dogs-list
    // which we grab from our global variable
    filteredBreeds = []
    console.log(event.target.value)
    selectedLetter = event.target.value
    betterBreedList.forEach(function(breed){
      if (breed[0] === selectedLetter){
        filteredBreeds.push(breed)
      } else {
        return
      }
    })
    dogBreedList.innerHTML = filteredBreeds.map(showDogBreed).join("")
  })

}) // end of DOMContentLoaded

function makeBetterBreedList(breeds){
  // we push every breed or adjective-breed into the betterBreedList array

  //let betterBreedList = []

  //console.log(breeds)
  //console.log(Object.keys(breeds))
  // This works! For each key in the breeds object, we check to see if it has values
  // (values are adjectives like "cocker" for spaniel)
  // if no values, just push the breed
  // if there are values, for every adjective, push the adjective-breed as a new variable
  Object.keys(breeds).forEach(function(breed){
    if (breeds[breed].length === 0){
      //console.log(breed)
      //dogBreedList.innerHTML += showDogBreed(breed)
      betterBreedList.push(breed)
    } else {
      breeds[breed].forEach(function(adjective){
        //console.log(`${adjective} ${breed}`)
        let specificBreed = `${adjective} ${breed}`
        //console.log(specificBreed)
        //dogBreedList.innerHTML += showDogBreed(specificBreed)
        betterBreedList.push(specificBreed)
      })
    }
  })
  //  dogBreedList.innerHTML += breeds.forEach(showDogBreed).join("")
  // actually just has to return the improved array
return betterBreedList
}

//making simple image tag for single dog image
function showDogImage(image){
  return `<img style="display:flex; width: 25%" class="dog-image" src=${image}>`
}

//making simple list item for single breed item
function showDogBreed(breed){
    return `<li>${breed}</li>`
}
