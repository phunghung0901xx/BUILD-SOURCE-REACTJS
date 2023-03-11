const express = require("express")
const { createUser, loginUserCrtl } = require('../controllers/userCrtl')
const router = express.Router()

router.post('/register', createUser)
router.post('/login', loginUserCrtl)


module.exports = router