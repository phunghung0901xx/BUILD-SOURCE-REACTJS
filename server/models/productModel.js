const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    catagory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        require:true,
    },
    brand: {
        type: String,
        require:true,
    },
    quantity: {
        type: Number,
        require:true,
    },
    solid: {
        type: Number,
        default: 0,
    },
    images: {
        type: Array,
    },
    color: {
        type: String,
        reuire:true,
    },
    rating: [{
        star: Number,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    }]
},
{timestamps:true}
);

//Export the model
module.exports = mongoose.model('Product', productSchema);