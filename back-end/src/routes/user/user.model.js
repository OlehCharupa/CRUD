import mongoose from "mongoose"
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: String,
    passwordHash: String,
    role: String,
    profiles: [{ type: mongoose.Types.ObjectId, ref: "Profiles" }]
})

export default mongoose.model("User", userSchema)