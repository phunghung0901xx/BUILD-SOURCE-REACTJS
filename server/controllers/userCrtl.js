const User = require("../models/userModel");
const asyncHandler = require("express-async-handler")
const { generateToken } = require("../config/jwtToken")
const validateMongoDbId = require("../ultis/validateMongoDbId")
const { generateRefreshToken } = require("../config/refreshToken")
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailCtrl");
const crypto = require("crypto")
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
        const refreshToken = await generateRefreshToken(findUser?._id)
        const updateUser = await User.findByIdAndUpdate(findUser?.id, {
            refreshToken: refreshToken
        }, {
            new: true
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        }
        )

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
    const { _id } = req.user
    validateMongoDbId(_id)
    try {
        const getaUser = await User.findById(_id)
        res.json({
            getaUser
        })
    }
    catch (error) {
        throw new Error(error)
    }
})

//handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies")
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({ refreshToken })
    if (!user) throw new Error("No Refresh token present in db or not matched")
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("There is something wrong with refresh token ")
        }
        const accessToken = generateToken(user?._id)
        res.json({ accessToken })
    })
})
//logout user 
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies")
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({ refreshToken })
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        })
        res.sendStatus(200)
    }
    await User.findOneAndUpdate(refreshToken, {
        refreshToken: "",
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    })
    res.sendStatus(200)
})
//Delete a single user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(_id)
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
    validateMongoDbId(_id)
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

const blockUser = asyncHandler(async (req, res) => {
    const { _id } = req.params
    validateMongoDbId(_id)
    try {
        const block = await User.findByIdAndUpdate(id, {
            isBlock: true,
        },
            {
                new: true,
            }
        )
        res.json({
            message: "User Blocked"
        })
    }
    catch (error) {
        throw new Error(error)
    }
})

const unblockUser = asyncHandler(async (req, res) => {
    const { _id } = req.params
    validateMongoDbId(_id)
    try {
        const unblock = await User.findByIdAndUpdate(id, {
            isBlock: false,
        },
            {
                new: true,
            }
        )
        res.json({
            message: "User unblocked"
        })
    }
    catch (error) {
        throw new Error(error)
    }

})

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const password = req.body.password
    console.log(password)
    console.log(req.body)
    validateMongoDbId(_id)
    const user = await User.findById(_id)
    if (password) {
        user.password = toString(password)
        const updatedPassword = await user.save()
        res.json(updatedPassword)
    } else {
        res.json(user)
    }

})

const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email });
    if (!user) throw new Error("User is not valid and not found")
    try {
        const token = await user.createPasswordResetToken()
        await user.save()
        const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset.password/${token}>Click Here</a>`
        const data = {
            to: email,
            text: "Hey User",
            subject: "Forgot Password Link",
            html: resetURL
        }
        sendEmail(data)
        res.json(token)
    }
    catch (error) {
        throw new Error(error)
    }
})

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body
    const {token} = req.params
    const hashedToken = crypto.createhash('sha256').update(token).digest("hex")
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires : {$gt: Date.Now()}
    })
    if(!user) throw new Error("Token Expired, Please try again later");
    user.password = password 
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
    res.json(user)
})
module.exports =
{
    createUser,
    loginUserCrtl,
    getAllUser,
    getaUser,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPasswordToken,
    resetPassword
}
