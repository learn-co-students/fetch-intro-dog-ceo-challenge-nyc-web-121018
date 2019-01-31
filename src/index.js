console.log('%c HI', 'color: firebrick')
let allDogs = []
let breeds = []

document.addEventListener('DOMContentLoaded', function() {
  const dogContainer = document.querySelector('#dog-image-container')
  const breedsContainer = document.querySelector('#dog-breeds')
  const dropdown = document.querySelector('#breed-dropdown')

  fetch("https://dog.ceo/api/breeds/image/random/4") // fetch for dog pics
    .then(response => {
      // console.log(response);
      return response.json();
    })
    .then(parsed => {
      allDogs = parsed['message']
      console.log(allDogs);
      dogContainer.innerHTML = showDogs(allDogs) // Pessimistic render b/c can only happen once fetch complete
      return allDogs
    })

  fetch('https://dog.ceo/api/breeds/list/all') // fetch for breeds
    .then(response => {
      return response.json()
    })
    .then(parsed => {
      breeds = Object.keys(parsed['message']) // only needed keys of JSON
      breedsContainer.innerHTML = showBreeds(breeds) // Pessimistic render
      console.log(breeds)
      return breeds
    })

    // dogContainer.innerHTML = showDogs(allDogs) // won't work b/c will run before fetch completes and allDogs will be empty

    breedsContainer.addEventListener('click', e => {
      console.log(e.target);

      for (let breed of breeds) {
        if (breed === e.target.innerText) {
          e.target.style = "color: blue"  //OR e.target.style.color = "red"
        }
      }
    })

    dropdown.addEventListener('change', d => {
      //console.log(d.target.value);
      let filtered = breeds.filter( breed => breed[0] === d.target.value)
      breedsContainer.innerHTML = showBreeds(filtered)
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
