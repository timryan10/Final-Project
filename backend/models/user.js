import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    country: {type: String, required: false},
    city: {type: String, required: false},
    // add all other remaining fields
})

userSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});


const User = mongoose.model("User", userSchema);

export default User;