const express = require("express")
const { getAllUsers,createUser,loginUser, findUserById, updateUser, deleteUser } = require("../controllers/usersController")
const { verifyToken } = require("../utils/auth")
const router = express.Router()

router.route('/signup/').post(createUser)
router.route('/login/').post(loginUser)
router.route('/users/').get(verifyToken,getAllUsers)
router.route('/users/:id').get(verifyToken,findUserById).delete(verifyToken,deleteUser).patch(verifyToken,updateUser)

module.exports = router