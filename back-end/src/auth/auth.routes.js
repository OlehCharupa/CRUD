import express from "express";
import Joi from "joi"
// import mongoose from "mongoose"

import { asyncWrapper } from "../helpers/asyncWrapper.js"
import validate from "../helpers/validate.js"
import { register, authorize, login, logout } from "./auth.controller.js"

const Router = express.Router
const router = Router()

const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
})

const signInSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

router.post("/register", validate(signUpSchema), asyncWrapper(register))
router.post("/login", validate(signInSchema), asyncWrapper(login))
router.post("/logout", asyncWrapper(authorize), asyncWrapper(logout))

export default router