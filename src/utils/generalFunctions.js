export function getRandomElement(array) {
  return array[getRandomNumber(array.length)]
}
export function getRandomNumber(number) {
  return Math.floor(Math.random() * number)
}

export function capitaliseFirstLetter(string) {
  let first = string[0].toUpperCase()
  return first + string.slice(1)
}

export function getArrayAtRange(arr, divisor, level) {
  const beginning = (level - 1) * divisor
  const end = level * divisor
  return arr.slice(beginning, end)
}
