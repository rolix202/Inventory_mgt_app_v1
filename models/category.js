import mongoose from "mongoose";

const CategoryModel = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Category name is required."],
        lowercase: true
    },
    description: {
        type: String,
        required: [true, "Description required."]
    },
    category_image_public_id: {
        type: String,
        required: true
    },
    category_image_secure_id: {
        type: String,
        required: true
    }, 
})

CategoryModel.index({ name: 1 }, { unique: true });

CategoryModel.virtual("url").get(function(){
    return `/categories/${this._id}`
})

const Category = mongoose.model("Category", CategoryModel)

export default Category;

