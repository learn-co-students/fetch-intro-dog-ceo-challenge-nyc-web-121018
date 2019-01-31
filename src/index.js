console.log('%c HI', 'color: firebrick')
let allDogs = []
let breeds = []

document.addEventListener('DOMContentLoaded', function() {
  const dogContainer = document.querySelector('#dog-image-container')
  const breedsContainer = document.querySelector('#dog-breeds')
  const breedDropdown = document.querySelector('#breed-dropdown')

  fetch("https://dog.ceo/api/breeds/image/random/4") // fetch for dog pics
    .then(response => {
      // console.log(response);
      return response.json();
    })
    .then(parsed => {
      allDogs = parsed['message']
      // console.log(allDogs);
      dogContainer.innerHTML = showDogs(allDogs) // Pessimistic render b/c can only happen once fetch complete
      return allDogs                             // dogContainer.innerHTML = showDogs(allDogs) // won't work b/c will run before fetch completes and allDogs will be empty
    })

  fetch('https://dog.ceo/api/breeds/list/all') // fetch for breeds
    .then(response => {
      return response.json()
    })
    .then(parsed => {
      breeds = Object.keys(parsed['message']) // only needed keys of JSON
      breedsContainer.innerHTML = showBreeds(breeds) // Pessimistic render
      // console.log(breeds)
      return breeds
    })

    breedsContainer.addEventListener('click', (e) => {
      // console.log(e)

      for (let b of breeds) {
        if (e.target.innerText === b) {
          e.target.style.color = "red"
        }
      }
    })

    breedDropdown.addEventListener('change', e =>{
      let selection = e.target.value
      let filteredBreeds = breeds.filter(b => b[0] === selection)
      // console.log(filteredBreeds);
      breedsContainer.innerHTML = showBreeds(filteredBreeds)
    })
}) // DOMContentLoaded ends

function showDogs(dogs) {
  return dogs.map(function(d) {
    // console.log(d)
    return `<img src="${d}">`
  }).join('')
}

function showBreeds(breeds) {
  return breeds.map(function(b) {
    // console.log(b)
    return `<li>${b}</li>`
  }).join('')
}
