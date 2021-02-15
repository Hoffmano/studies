import { getTotal, addItem } from '../../lib/cart'

describe('CART', () => {
  it('should return 0 when getTotal() is called in a newly created cart', () => {
    const cart = []

    expect(getTotal(cart)).toEqual(0)
  })

  it('should add an item to cart', () => {
    let cart = []

    const item = {
      product: {
        title: 'Tenis',
        price: 5000,
      },
      quantity: 2,
    }

    cart = addItem(cart, item)

    expect(cart).toEqual([
      {
        product: {
          title: 'Tenis',
          price: 5000,
        },
        quantity: 2,
      },
    ])
  })

  it('should allow just one item of each product in the cart', () => {
    let cart = []

    const item = {
      product: {
        title: 'Tenis',
        price: 5000,
      },
      quantity: 2,
    }

    cart = addItem(cart, item)
    cart = addItem(cart, {...item, quantity: 1})

    expect(cart).toEqual([
      {
        product: {
          title: 'Tenis',
          price: 5000,
        },
        quantity: 3,
      },
    ])
  })

  it('should multiply quantity by price and return the total amount', () => {
    const cart = [
      {
        product: {
          title: 'Tenis',
          price: 5000,
        },
        quantity: 2,
      },
    ]

    expect(getTotal(cart)).toEqual(10000)
  })
})
