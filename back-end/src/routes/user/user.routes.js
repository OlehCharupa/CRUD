import express from "express";
import Joi from "joi"
import { authorize } from "../../auth/auth.controller.js";
import { asyncWrapper } from "../../helpers/asyncWrapper.js";
import { currentUser } from "./user.controller.js";
import validate from "../../helpers/validate.js"
import { allUsers, editUser, deleteUser } from "./user.controller.js"

const Router = express.Router
const router = Router()

const editUserSchema = Joi.object({
    nameUser: Joi.string(),
    email: Joi.string(),
    role: Joi.string(),
    _id: Joi.string()
})

router.get("/currentUser",
    asyncWrapper(authorize),
    asyncWrapper(currentUser))


router.get("/allUsers",
    asyncWrapper(authorize),
    asyncWrapper(allUsers))


router.patch("/:_id",
    asyncWrapper(authorize),
    validate(editUserSchema, "params"),
    asyncWrapper(editUser))


router.delete("/:_id",
    asyncWrapper(authorize),
    validate(editUserSchema, "params"),
    asyncWrapper(deleteUser))

export default router