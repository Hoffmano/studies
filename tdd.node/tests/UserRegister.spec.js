const request = require('supertest')
const app = require('../src/app')
const User = require('../src/user/User')
const sequelize = require('../src/config/database')

const validUser = {
  username: 'user1',
  email: 'user1@gmail.com',
  password: 'password',
}

const invalidUser = {
  username: null,
  email: 'user1@gmail.com',
  password: 'password',
}

const postUser = user => {
  return request(app).post('/api/1.0//users').send(user)
}

async function getFirstUser() {
  const userList = await User.findAll()
  const savedUser = userList[0]
  return savedUser
}

beforeAll(() => {
  return sequelize.sync()
})

beforeEach(() => {
  return User.destroy({ truncate: true })
})

describe('User registration', () => {
  it('should return 200 ok when signup request is valid', async () => {
    const response = await postUser(validUser)
    expect(response.status).toBe(200)
  })

  it('should return success message when signup request is valid', async () => {
    const response = await postUser(validUser)
    expect(response.body.message).toBe('user created successfully')
  })

  it('should saves the user to database', async () => {
    await postUser(validUser)
    const userList = await User.findAll()
    expect(userList.length).toBe(1)
  })

  it('should saves the username and email to database', async () => {
    await postUser(validUser)
    const savedUser = await getFirstUser()
    expect(savedUser.username).toBe(validUser.username)
    expect(savedUser.email).toBe(validUser.email)
  })

  it('should encrypt the password in database', async () => {
    await postUser(validUser)
    const savedUser = await getFirstUser()
    expect(savedUser.password).not.toBe(validUser.password)
  })

  it('should return 400 when username is null', async () => {
    const response = await postUser(invalidUser)
    expect(response.status).toBe(400)
  })

  it('should return validation errors field in response body when validation error occurs', async () => {
    const response = await postUser(invalidUser)
    expect(response.body.validationErrors).not.toBeUndefined()
  })

  it('should return validation errors messages if username and email is null', async () => {
    const response = await postUser({
      ...validUser,
      username: null,
      email: null,
    })
    expect(Object.keys(response.body.validationErrors)).toEqual([
      'username',
      'email',
    ])
  })

  test.each`
    field         | value                      | expectedMessage
    ${'username'} | ${null}                    | ${'username must not be null'}
    ${'username'} | ${'ga'}                    | ${'username must be greater than 4 characters and lesser then 10 characters'}
    ${'username'} | ${'gabriel hoffman silva'} | ${'username must be greater than 4 characters and lesser then 10 characters'}
    ${'email'}    | ${null}                    | ${'email must not be null'}
    ${'email'}    | ${'mail.com'}              | ${'email is not valid'}
    ${'password'} | ${null}                    | ${'password must not be null'}
  `(
    'should return validation errors message if $field is $value ',
    async ({ field, value, expectedMessage }) => {
      const user = validUser
      user[field] = value
      const response = await postUser(user)
      expect(response.body.validationErrors[field]).toBe(expectedMessage)
    },
  )

  // it('should return validation errors messages if username is less than 4 characters or greater than 10 characters', async () => {
  //   const user = validUser
  //   user.username = 'gabriel hoffman'
  //   const response = await postUser(user)
  //   expect(response.body.validationErrors.username).toBe(
  //     'username must be greater than 4 characters and lesser then 10 characters',
  //   )
  // })
})
