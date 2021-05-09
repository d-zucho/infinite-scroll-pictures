const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = []

// Unspace API
const count = 10
const apiKey = 'BHKuvwmoFetwmnCbhzxmGSafYDd2D0xiwBGGnDLdMeo'
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// * Create Elements for Links & Photos, Add to DOM
function displayPhotos(photosArray) {
  photosArray.forEach((photo) => {
    //* Create elements for picture details
    const item = document.createElement('a')
    item.setAttribute('href', photo.links.html)
    item.setAttribute('target', '_blank')

    const image = document.createElement('img')
    image.setAttribute('src', photo.urls.regular)
    image.setAttribute('alt', photo.alt_description)
    image.setAttribute('title', photo.alt_description)

    // * Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(image)
    imageContainer.appendChild(item)
  })
}

//* Get Photos From Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL)
    const photosArray = await response.json()
    displayPhotos(photosArray)
  } catch (error) {
    console.log('oh no error: ', error)
  }
}

// * On Load
getPhotos()
