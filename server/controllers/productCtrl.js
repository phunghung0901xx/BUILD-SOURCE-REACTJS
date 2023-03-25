const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler")
const slugify = require("slugify")


const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await Product.create(req.body)
        res.json(newProduct)
    }
    catch (error) {
        throw new Error(error)
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id   
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const updateProduct = await Product.findOneAndUpdate(
             id, 
             req.body, 
             {new:true}
        )
        res.json(updateProduct)
    }
    catch (error) {
        throw new Error(error)
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id
    try {

        const deleteProduct = await Product.findOneAndDelete(
            id,
            req.body,
            { new: true }
        )
        res.json(deleteProduct)
    }
    catch (error) {
        throw new Error(error)
    }
})

const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const finProduct = await Product.findById(id)
        res.json(finProduct)
    }
    catch (error) {
        throw new Error(error)
    }
})

const getAllProduct = asyncHandler(async (req, res) => {
    console.log(req.query)
    try {
        const getAllProduct = await Product.find()
        res.json(getAllProduct)
    }
    catch (error) {
        throw new Error(error)
    }
})

module.exports = 
{ 
    createProduct,
    getaProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
}