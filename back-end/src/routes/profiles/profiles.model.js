import mongoose from "mongoose"
const Schema = mongoose.Schema

const profileSchema = new Schema({
    nameProfile: String,
    gender: String,
    birthdate: String,
    city: String
})

export default mongoose.model("Profile", profileSchema)