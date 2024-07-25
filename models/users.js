import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
})

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12)

    next()
})

UserSchema.methods.comparePassword = async function(userPass, passDb ){
    return await bcrypt.compare(userPass, passDb)
}

const User = mongoose.model("User", UserSchema)

export default User