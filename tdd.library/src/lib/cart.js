import { forEach, equals } from 'ramda'

const getTotal = cart =>
  cart.reduce(
    (accumulator, item) => accumulator + item.quantity * item.product.price,
    0,
  )

const addItem = (cart, item) => {
  let previousQuantity = 0

  forEach((cartItem, index) => {
    if (equals(cartItem.product, item.product)) {
      previousQuantity = cartItem.quantity
      cart.splice(index, 1)
    }
  }, cart)

  cart.push({ ...item, quantity: previousQuantity + item.quantity })
  
  return cart
}

export { getTotal, addItem }
