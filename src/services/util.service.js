export const utilService = {
  makeId,
  saveToStorage,
  loadFromStorage,
  debounce,
  animateCSS,
  getRandomLabels,
  getRandomToyName,
}

function makeId(length = 5) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function saveToStorage(key, value) {
  localStorage[key] = JSON.stringify(value)
}

function loadFromStorage(key, defaultValue = null) {
  var value = localStorage[key] || defaultValue
  return JSON.parse(value)
}

export function animateCSS(el, animation, isRemoveClass = true) {
  const prefix = 'animate__'
  return new Promise((resolve) => {
    const animationName = `${prefix}${animation}`
    el.classList.add(`${prefix}animated`, animationName)

    function handleAnimationEnd(event) {
      event.stopPropagation()
      if (isRemoveClass) el.classList.remove(`${prefix}animated`, animationName)
      resolve('Animation ended')
    }

    el.addEventListener('animationend', handleAnimationEnd, { once: true })
  })
}

export function debounce(func, delay) {
  let timeoutId

  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

export function getExistingProperties(obj) {
  const truthyObj = {}
  for (const key in obj) {
    const val = obj[key]
    if (val || typeof val === 'boolean') {
      truthyObj[key] = val
    }
  }
  return truthyObj
}

export function getRandomLabels(labels) {
  const count = Math.floor(Math.random() * 3) + 1
  const result = []
  const usedIndexes = []

  while (result.length < count) {
    const idx = Math.floor(Math.random() * labels.length)
    if (!usedIndexes.includes(idx)) {
      result.push(labels[idx])
      usedIndexes.push(idx)
    }
  }

  return result
}

export function getYearCreated(time) {
  const timestamp = time
  const date = new Date(timestamp)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  const formattedDate = `${day}.${month}.${year}`
  return formattedDate
}
export function getRandomToyName() {
  const adjectives = [
    'Funny',
    'Speedy',
    'Tiny',
    'Giant',
    'Magic',
    'Cuddly',
    'Bouncy',
    'Happy',
  ]
  const nouns = [
    'Robot',
    'Unicorn',
    'Car',
    'Dino',
    'Puzzle',
    'Bear',
    'Ball',
    'Train',
  ]
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
  return `${randomAdjective} ${randomNoun}`
}
