const sum = (number1, number2) => {
  number1 = parseInt(number1)
  number2 = parseInt(number2)

  if (Number.isNaN(number1) || Number.isNaN(number2))
    throw new Error()

  return number1 + number2
}

export { sum }
