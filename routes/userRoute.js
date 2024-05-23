const express = require("express")
const { getAllUsers,createUser,loginUser, findUserById, updateUser, deleteUser } = require("../controllers/usersController")
const router = express.Router()

router.route('/signup/').post(createUser)
router.route('/login/').post(loginUser)
router.route('/users/').get(getAllUsers)
router.route('/users/:id').get(findUserById).delete(deleteUser).patch(updateUser)

module.exports = router