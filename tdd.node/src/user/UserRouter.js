const express = require('express')
const router = express.Router()
const UserService = require('./UserService')
const { check, validationResult } = require('express-validator')

router.post(
  '/api/1.0//users',
  check('username')
    .notEmpty()
    .withMessage('username must not be null')
    .bail()
    .isLength({ min: 4, max: 10 })
    .withMessage(
      'username must be greater than 4 characters and lesser then 10 characters',
    ),
  check('email')
    .notEmpty()
    .withMessage('email must not be null')
    .bail()
    .isEmail()
    .withMessage('email is not valid'),
  check('password').notEmpty().withMessage('password must not be null'),
  async (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      const validationErrors = {}
      errors
        .array()
        .forEach(error => (validationErrors[error.param] = error.msg))
      return response.status(400).send({ validationErrors })
    }
    await UserService.save(request.body)
    return response.send({ message: 'user created successfully' })
  },
)

module.exports = router
