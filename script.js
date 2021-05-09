const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

// Unspace API
const count = 30
const apiKey = 'BHKuvwmoFetwmnCbhzxmGSafYDd2D0xiwBGGnDLdMeo'
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// * Check if all Images Were Loaded
function imageLoaded() {
  imagesLoaded++
  if (imagesLoaded === totalImages) {
    ready = true
    loader.hidden = true
  }
}

//* Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// * Create Elements for Links & Photos, Add to DOM
function displayPhotos(photosArray) {
  imagesLoaded = 0
  totalImages = photosArray.length
  photosArray.forEach((photo) => {
    //* Create elements for picture details
    const item = document.createElement('a')
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    })

    const image = document.createElement('img')

    setAttributes(image, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })

    // * Event listener, check when each is finished loading
    image.addEventListener('load', imageLoaded)

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

//* Event Listeners
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false
    getPhotos()
  }
})
