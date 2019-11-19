export const required = val => typeof val !== 'undefined' && val !== ''
export const isNumber = val => typeof val === 'undefined' || val === '' || (!isNaN(parseFloat(val)) && isFinite(val))
export const isInteger = val => typeof val === 'undefined' || val === '' || Number.isInteger(Number(val))
export const min = (val, min) => typeof val === 'undefined' || val === '' || val > min
export const maxPercent = val => typeof val === 'undefined' || val === '' || val <= 100
export const smaller = (val, max) => {
  return parseFloat(val) <= parseFloat(max)
}
export const bigger = (val, min) => {
  return parseFloat(val) >= parseFloat(min)
}

export const lotNumber = val => {
  const localLots = JSON.parse(localStorage.getItem('productLots'))
  const lotNumbers = []
  for (let i = 0; i < localLots.length; i++) {
    lotNumbers.push(localLots[i].lotNumber)
  }

  return !lotNumbers.includes(val)
}

export const messages = {
  required: 'Required',
  isNumber: 'Must be number',
  isInteger: 'Must be integer',
  min: 'Must be greater than 0',
  maxPercent: 'Maximum is 100%',
  smaller: 'Must be < or = to Max',
  bigger: 'Must be > or = to Min',
  lotNumber: 'Lot Number already exists'
}
