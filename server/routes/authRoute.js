const express = require("express")
const { createUser, loginUserCrtl, getAllUser, getaUser, deleteUser, updateUser } = require('../controllers/userCrtl')
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares")
const router = express.Router()

router.post('/register', createUser)
router.post('/login', loginUserCrtl)
router.get('/allUsers', getAllUser)
router.get('/:id', authMiddleware, isAdmin, getaUser)
router.delete('/:id', deleteUser)
router.put('/updateUser', updateUser, authMiddleware)
module.exports = router