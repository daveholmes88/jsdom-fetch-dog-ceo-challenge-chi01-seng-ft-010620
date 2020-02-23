let breeds = []
const dogImageContainer = document.querySelector("#dog-image-container")
const dogBreedContainer = document.querySelector("#dog-breeds")
const breedDropdown = document.getElementById("breed-dropdown")

const fetchImages = () => {
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    .then(dogImages => renderDogImages(dogImages))
} 

const renderDogImages = (dogImages) => {
  dogImages.message.forEach(dogImage => {
    const image = document.createElement("img")
    image.src = dogImage
    dogImageContainer.appendChild(image)
  })
}

const fetchBreeds = () => {
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(dogBreeds => {
      breeds = Object.keys(dogBreeds.message)
      renderDogBreeds(breeds)
      addBreedSelectListener()
    })
}

const renderDogBreeds = (dogBreeds) => {
  dogBreeds.forEach(dogBreed => {
    const li = document.createElement("li")
    li.innerText = dogBreed
    dogBreedContainer.appendChild(li)
    li.addEventListener('click', updateColor)
  })
}

const updateColor = (event) => {
  event.target.style.color = 'blue'
}

const addBreedSelectListener = () => {
  breedDropdown.addEventListener('change', function(event) {
    selectBreedStartingWith(event.target.value); 
  })
}

const selectBreedStartingWith = (letter) => {
  updateBreedList(breeds.filter(breed => breed.startsWith(letter)))
}

const updateBreedList = (breeds) => {
  removeChildren(dogBreedContainer)
  renderDogBreeds(breeds)
}

const removeChildren = (element) => {
  let child = element.lastElementChild; 
  while (child) {
    element.removeChild(child)
    child = element.lastElementChild
  }
}


fetchImages()
fetchBreeds()

