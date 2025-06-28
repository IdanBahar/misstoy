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
  console.log('🔎 FILTER RECEIVED:', filterBy)
  try {
    let toys = await storageService.query(STORAGE_KEY)
    const { name = '', label = '', inStock, sortBy = '' } = filterBy

    if (name) {
      const lowerName = name.toLowerCase()
      toys = toys.filter((toy) => toy.name?.toLowerCase().includes(lowerName))
    }

    if (label) {
      const lowerLabel = label.toLowerCase()
      toys = toys.filter((toy) =>
        toy.labels?.some((lbl) => lbl.toLowerCase().includes(lowerLabel))
      )
    }

    if (inStock === true || inStock === false) {
      toys = toys.filter((toy) => toy.inStock === inStock)
    }

    if (sortBy) {
      toys.sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        if (sortBy === 'price') return a.price - b.price
        if (sortBy === 'createdAt') return a.createdAt - b.createdAt
      })
    }
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
  const toys = await storageService.query('toys')
  console.log(
    '📦 All toy IDs before removal:',
    toys.map((t) => t._id)
  )
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

function createToy({ name = '', price = 0, labels = [], inStock = true } = {}) {
  return {
    _id: utilService.makeId(),
    name,
    price,
    labels,
    createdAt: Date.now(),
    inStock,
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
    filterBy[field] = searchParams.get(field) || ''
  }
  return filterBy
}

function _createToys() {
  let toys = utilService.loadFromStorage(STORAGE_KEY)
  if (!toys || !toys.length) {
    toys = []
    for (let i = 0; i < 10; i++) {
      const toy = createToy({
        name: utilService.getRandomToyName(),
        price: Math.floor(Math.random() * 81) + 20,
        labels: utilService.getRandomLabels(labels),
        inStock: Math.random() > 0.5,
      })
      toys.push(toy)
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
  }
}
