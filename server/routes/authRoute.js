const express = require("express")
const { createUser, loginUserCrtl, getAllUser, getaUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken } = require('../controllers/userCrtl')
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares")
const router = express.Router()

router.post('/register', createUser)
router.post('/login', loginUserCrtl)
router.get('/allUsers', getAllUser)
router.get('/refresh', handleRefreshToken)

router.get('/:id', authMiddleware, isAdmin, getaUser)
router.delete('/:id', deleteUser)
router.put('/editUser', updateUser,isAdmin, authMiddleware)
router.put('/blockUser/:id', blockUser, isAdmin, authMiddleware)
router.put('/unblockUser/:id', unblockUser, isAdmin, authMiddleware)

module.exports = router