const express = require('express')
const auth_controller = require('../controllers/auth_controller')
const user_controller = require('../controllers/user_controller')
const router = express.Router()

router.post('/signup', auth_controller.signup)
router.post('/login', auth_controller.login)
router.get('/', user_controller.getAllUsers)
router.get('/:id', user_controller.getUser)
router
      .route('/:id')
      .get(user_controller.getUser)
      .patch(user_controller.updateUser)
      .delete(user_controller.deleteUser)



module.exports = router;