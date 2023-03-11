const User = require("../models/userModel");
const asyncHandler = require("express-async-handler")
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email
    const mobile = req.body.mobile
    const findUser = await User.findOne({ email: email, mobile: mobile })
    if (!findUser) {
        // Create a new User
        const newUser = await User.create(req.body)
        res.json(newUser)
    }
    else {
        // User Already Exists
        throw new Error('User Already Exists')
    }
})
const loginUserCrtl = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log(email,password)
})
module.exports = { createUser, loginUserCrtl }