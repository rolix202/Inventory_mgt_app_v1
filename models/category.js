import mongoose from "mongoose";

const CategoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required."],
        lowercase: true
    },
    description: {
        type: String,
        required: [true, "Description required."]
    }
})

CategoryModel.virtual("url").get(function(){
    return `/category/${this._id}`
})

const Category = mongoose.model("Category", CategoryModel)

export default Category;

