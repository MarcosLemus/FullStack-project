const { Router } = require('express')

const userController = require('../controllers/users')

const { userValidationSchema } = require('../models/user')
const validate = require('../middlewares/validate')

const router = Router()

router.post('/signup', userValidationSchema, validate, userController.register)
router.post('/signin', userValidationSchema, validate, userController.login)

module.exports = router
