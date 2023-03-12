const express = require("express")
const { createUser, loginUserCrtl, getAllUser, getaUser, deleteUser, updateUser } = require('../controllers/userCrtl')
const router = express.Router()

router.post('/register', createUser)
router.post('/login', loginUserCrtl)
router.get('/allUsers', getAllUser)
router.get('/:id', getaUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)
module.exports = router