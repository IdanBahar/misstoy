import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const toyService = {
  query,
  save,
  remove,
  getById,
  createToy,
  getDefaultFilter,
  getFilterFromSearchParams,
}

const STORAGE_KEY = 'toys'

const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
  'Battery Powered',
]
_createToys()

async function query(filterBy = {}) {
  try {
    let toys = await storageService.query(STORAGE_KEY)
    // console.log(' Total toys before filtering:', toys.length)
    const { name = '', label = '', inStock, sortBy = '' } = filterBy

    if (name) {
      console.log('🔠 Filtering by name:', name)

      const lowerName = name.toLowerCase()
      toys = toys.filter((toy) => toy.name?.toLowerCase().includes(lowerName))
    }

    if (label) {
      // console.log('Filtering by label:', label)

      const lowerLabel = label.toLowerCase()
      toys = toys.filter((toy) =>
        toy.labels?.some((lbl) => lbl.toLowerCase().includes(lowerLabel))
      )
    }

    if (inStock === true || inStock === false) {
      toys = toys.filter((toy) => toy.inStock === inStock)
    }

    if (sortBy) {
      // console.log('Sorting by:', sortBy)

      toys.sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        if (sortBy === 'price') return a.price - b.price
        if (sortBy === 'createdAt') return a.createdAt - b.createdAt
      })
    }
    // console.log(' Toys after filtering:', toys.length)
    return toys
  } catch (error) {
    console.log('error:', error)
    throw error
  }
}

function getById(id) {
  return storageService.get(STORAGE_KEY, id)
}

async function remove(id) {
  return storageService.remove(STORAGE_KEY, id)
}

function save(toyToSave) {
  if (toyToSave._id) {
    return storageService.put(STORAGE_KEY, toyToSave)
  } else {
    toyToSave.isOn = false
    return storageService.post(STORAGE_KEY, toyToSave)
  }
}

function createToy({
  name = '',
  price = 0,
  labels = [],
  inStock = true,
  imgUrl = '',
} = {}) {
  return {
    _id: utilService.makeId(),
    name,
    price,
    labels,
    createdAt: Date.now(),
    inStock,
    imgUrl,
  }
}

function getDefaultFilter() {
  return {
    name: '',
    label: '',
    inStock: '',
    sortBy: '',
  }
}

function getFilterFromSearchParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in defaultFilter) {
    const value = searchParams.get(field)
    if (field === 'inStock') {
      filterBy.inStock =
        value === 'true' ? true : value === 'false' ? false : ''
    } else {
      filterBy[field] =
        value !== null ? decodeURIComponent(value) : defaultFilter[field]
    }
  }
  return filterBy
}

function _createToys() {
  const imgUrls = [
    'https://i.postimg.cc/VSjnSgLN/22981-7-toy-story-alien-file.png',
    'https://i.postimg.cc/gXshs0hF/68781-jessie-story-toy-file-sheriff-characters-buzz.png',
    'https://i.postimg.cc/vxmVNd71/batman.png',
    'https://i.postimg.cc/grc8Jv9Y/captain.png',
    'https://i.postimg.cc/mhdMFtR7/deadpool.png',
    'https://i.postimg.cc/47xyJQYq/ironman.png',
    'https://i.postimg.cc/v1Lx8m3g/Png-Item-464551.png',
    'https://i.postimg.cc/LY9YJMby/Png-Item-465253.png',
    'https://i.postimg.cc/QVn9dwkb/Png-Item-494826.png',
    'https://i.postimg.cc/V5N01mMv/Png-Item-5369982.png',
    'https://i.postimg.cc/SJJ9LkN3/Png-Item-6498.png',
    'https://i.postimg.cc/PCD8cyDM/Png-Item-7093.png',
    'https://i.postimg.cc/2VMZ2M16/Png-Item-7737.png',
    'https://i.postimg.cc/cKN8N3MG/Png-Item-8473.png',
    'https://i.postimg.cc/r0fdWP6q/xmen.png',
  ]
  let toys = utilService.loadFromStorage(STORAGE_KEY)
  if (!toys || !toys.length) {
    toys = []
    for (let i = 0; i < 10; i++) {
      const toy = createToy({
        name: utilService.getRandomToyName(),
        price: Math.floor(Math.random() * 81) + 20,
        labels: utilService.getRandomLabels(labels),
        inStock: Math.random() > 0.5,
        imgUrl: imgUrls[i % imgUrls.length],
      })
      toys.push(toy)
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
  }
}
