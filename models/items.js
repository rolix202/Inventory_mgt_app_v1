import mongoose from "mongoose";

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
    }
})

ItemModel.virtual("url").get(function(){
    return `/category/item/${this._id}`
})

const Item = mongoose.model("Item", ItemModel)

export default Item