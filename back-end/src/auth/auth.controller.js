import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

import UserModel from "../routes/user/user.model.js"
import ProfileModel from "../routes/profiles/profiles.model.js"

export const register = async (req, res) => {
    const { name, email, password, role } = req.body
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
        return res.status(409).send({ message: `User with ${email} email already exists` })
    }
    const passwordHash = await bcryptjs.hash(
        password, Number(process.env.HASH_POWER)
    )
    await UserModel.create({
        name,
        email,
        role,
        passwordHash,
        profiles: [],
    })

    return res.status(201).send({
        message: `New user created`
    })
}

export const login = async (req, res, next) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
        return res.status(403).send({ message: `User with ${email} email doesn't exist` })
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.passwordHash)
    if (!isPasswordCorrect) {
        return res.status(403).send({ message: "Password is wrong" })
    }

    const accessToken = jwt.sign(
        { uid: user._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME,
        }
    );


    return UserModel.findOne({ email }).populate({
        path: "profiles",
        model: ProfileModel
    })
        .exec((error, data) => {
            if (error) {
                next(error)
            }
            return res.status(200).send({
                accessToken,
                data: {
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    profiles: data.profiles
                }
            })
        })
}

export const logout = async (req, res) => {
    req.user = null;
    return res.status(204).end()
}

export const authorize = async (req, res, next) => {
    const authirizationHeader = req.header("Authorization")
    if (authirizationHeader) {
        const accessToken = authirizationHeader.replace("Bearer ", "")
        let payload
        try {
            payload = jwt.verify(accessToken, process.env.JWT_SECRET)
        } catch (error) {
            console.log(payload);
            return res.status(401).send({ message: "Unauthorized" })
        }
        const user = await UserModel.findById(payload.uid)

        if (!user) {
            return res.status(404).send({ message: "Invalid user" })
        }

        req.user = user;

        next()
    } else return res.status(400).send({ message: "No token provided" })
}

