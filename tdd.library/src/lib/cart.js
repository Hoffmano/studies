import { gt, equals } from 'ramda'

const getTotal = cart =>
  cart.reduce(
    (accumulator, item) => accumulator + item.quantity * item.product.price,
    0,
  )

const addItem = (cart, item) => {
  const foundItemIndex = cart.findIndex(cartItem =>
    equals(cartItem.product, item.product),
  )

  if (gt(foundItemIndex, -1)) {
    cart[foundItemIndex].quantity += item.quantity
  } else {
    cart.push(item)
  }

  return cart
}

export { getTotal, addItem }
