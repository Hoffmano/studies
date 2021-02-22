import { gt, equals } from 'ramda'
import Dinero from 'dinero.js'
const Money = Dinero

Money.defaultCurrency = 'BRL'
Money.defaultPrecision = 2
Money.defaultAmount = 0

const getTotal = (cart, discount) => {
  const total = cart.reduce(
    (accumulator, item) =>
      accumulator.add(
        Money({
          amount: item.quantity * item.product.price,
        }),
      ),
    Money(),
  )

  if (discount && discount.percentage && total.getAmount() > discount.minimum) {
    const totalToDiscount = total.multiply(discount.percentage)

    return total.subtract(totalToDiscount)
  }

  return total
}

const addItem = (cart, item, quantity = 1) => {
  if (quantity) item = { ...item, quantity: quantity }

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

const updateQuantity = (cart, item, quantity) => {
  item = { ...item, quantity }

  const foundItemIndex = cart.findIndex(cartItem =>
    equals(cartItem.product, item.product),
  )

  if (gt(foundItemIndex, -1)) {
    cart[foundItemIndex].quantity += item.quantity

    if (cart[foundItemIndex].quantity <= 0) {
      cart.splice(foundItemIndex, 1)
    }
  } else {
    cart.push(item)
  }

  return cart
}

const summary = cart => {
  const total = getTotal(cart).getAmount()
  const checkout = { items: cart, total }
  return checkout
}

const checkout = cart => {
  const checkout = summary(cart)
  return { updatedCart: [], checkoutCart: checkout }
}

export { getTotal, addItem, updateQuantity, summary, checkout }
