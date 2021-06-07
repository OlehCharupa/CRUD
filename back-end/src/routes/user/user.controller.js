import UserModel from "./user.model.js"
import ProfileModel from "../profiles/profiles.model.js"
import { composeUsers } from "../../helpers/serialize.js"


export const currentUser = async (req, res) => {
    const user = req.user
    const { email } = user
    await UserModel.findOne({ email }).populate({
        path: "profiles",
        model: ProfileModel
    })
        .exec((error, data) => {
            if (error) {
                next(error)
            }
            return res.status(200).send({
                _id: data._id,
                name: data.name,
                email: data.email,
                role: data.role,
                profiles: data.profiles
            }
            )
        })
}

export const allUsers = async (req, res) => {
    const user = req.user
    const { role } = user
    if (!role === "admin") {
        res.status(404).sedn({ message: "User is not an admin" })
    }
    await UserModel.find().populate({
        path: "profiles",
        model: ProfileModel
    })
        .exec((error, data) => {
            if (error) {
                next(error)
            }
            return res.status(200).send(
                composeUsers(data)
            )
        })
}

export const editUser = async (req, res) => {
    const { _id } = req.params
    const user = await UserModel.findByIdAndUpdate(
        _id,
        { $set: req.body },
        { new: true }
    )
    if (!user) {
        res.status(404).send({ message: "User not found" })
    }
    return res.status(200).send(composeUsers(user))
}

export const deleteUser = async (req, res) => {
    const { _id } = req.params
    const user = await UserModel.findByIdAndDelete(_id)
    if (!user) {
        return res.status(404).send({ message: "User not found" })
    }
    return res.status(204).send({ message: "User deleted" })
}