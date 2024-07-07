import mongoose, { Schema } from "mongoose";

const ItemModel = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    },
    description: {
        type: String,
        lowercase: true,
        required:true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    number_in_stock: {
        type: Number,
        required: true
    },
    product_public_id: {
        type: String,
        required: true
    },
    product_secure_url: {
        type: String,
        required: true
    }
})

ItemModel.virtual("url").get(function(){
    return `/items/${this._id}`
})

const Item = mongoose.model("Item", ItemModel)

export default Item;