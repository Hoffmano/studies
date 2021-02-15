import { getTotal, updateQuantity, checkout, summary } from '../../lib/cart'

let sneakers = {
  product: {
    title: 'Tênis',
    price: 5000,
  },
  quantity: 1,
}

let shirt = {
  product: {
    title: 'Shirt',
    price: 3000,
  },
  quantity: 1,
}

describe('CART', () => {
  it('should return 0 when getTotal() is called in a newly created cart', () => {
    let cart = []

    expect(getTotal(cart).getAmount()).toEqual(0)
  })

  it('should add an item to cart', () => {
    let cart = []

    cart = updateQuantity(cart, sneakers, 1)

    expect(cart).toEqual([sneakers])
  })

  it('should allow just one item of each product in the cart', () => {
    let cart = []

    cart = updateQuantity(cart, sneakers, 1)
    cart = updateQuantity(cart, sneakers, 2)

    expect(cart).toEqual([{ ...sneakers, quantity: 3 }])
  })

  it('should multiply quantity by price and return the total amount', () => {
    let cart = []

    cart = updateQuantity(cart, sneakers, 2)

    expect(getTotal(cart).getAmount()).toEqual(10000)
  })

  it('should update total amount in cart', () => {
    let cart = []

    expect(getTotal(cart).getAmount()).toEqual(0)

    cart = updateQuantity(cart, shirt, 1)
    expect(getTotal(cart).getAmount()).toEqual(3000)

    cart = updateQuantity(cart, sneakers, 1)
    expect(getTotal(cart).getAmount()).toEqual(8000)
  })

  it('should remove some item from cart', () => {
    let cart = []

    cart = updateQuantity(cart, shirt, 1)
    cart = updateQuantity(cart, shirt, -1)
    expect(cart).toEqual([])
  })

  it('should remove some item from cart', () => {
    let cart = []

    cart = updateQuantity(cart, shirt, 1)
    cart = updateQuantity(cart, sneakers, 11)

    expect(summary(cart)).toMatchSnapshot()
  })

  it('should cleanup cart', () => {
    let cart = []

    cart = updateQuantity(cart, shirt, 1)
    cart = updateQuantity(cart, sneakers, 11)

    const { updatedCart, checkoutCart } = checkout(cart)
    
    expect(getTotal(updatedCart).getAmount()).toEqual(0)
    expect(checkoutCart).toMatchSnapshot()
  })
})
