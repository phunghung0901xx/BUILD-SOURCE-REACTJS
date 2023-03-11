const User = require("../models/userModel");

const createUser = async (req,res) => {
    const email = req.body.email
    const findUser = await User.findOne({ email: email })
    if (!findUser) {
        // Create a new User
        const newUser = User.create(req.body)
        res.json(newUser)
    }
    else {
        // User Already Exists
        res.json({
            message:"User Already Exsits",
            success: false
        })
    }
}
module.exports= { createUser }