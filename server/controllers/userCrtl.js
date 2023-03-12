const User = require("../models/userModel");
const asyncHandler = require("express-async-handler")
const generateToken = require("../config/jwtToken")

//Create User
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

//Login User
const loginUserCrtl = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // check if user exists or not 
    const findUser = await User.findOne({ email })
    if (findUser && await findUser.isPasswordMatched(password)) {
        res.json({
            _id: findUser?._id,
            fristName: findUser?.fristName,
            lastName: findUser?.lastName,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)
        })
    }
    else {
        throw new Error("Invalid Credentials")
    }
})

//Get All User
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find()
        res.json(getUsers)
    }
    catch (err) {
        throw new Error(err)
    }
})

//Get a single user
const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const getaUser = await User.findById(id)
        res.json({
            getaUser
        })
    }
    catch (error) {
        throw new Error(error)
    }
})

//Delete a single user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const deleteUser = await User.findByIdAndDelete(id)
        res.json({
            deleteUser
        })
    }
    catch (error) {
        throw new Error(error)
    }
})

//Update a user
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const updateUser = await User.findByIdAndUpdate
        (id,
            {
                firstName: req?.body?.firstName,
                lastName: req?.body?.lastName,
                email: req?.body?.email,
                mobile: req?.body?.mobile
            },
            {
                new: true
            }
        )
        res.json(updateUser)

    }
    catch (error) {
        throw new Error(error)
    }
})
module.exports = { createUser, loginUserCrtl, getAllUser, getaUser, deleteUser, updateUser }
