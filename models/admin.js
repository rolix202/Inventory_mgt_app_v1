import mongoose from "mongoose";

const AdminModel = new mongoose.Schema({
    username: String,
    password: String,
})

const Admin = mongoose.model("Admin", AdminModel)

export default Admin