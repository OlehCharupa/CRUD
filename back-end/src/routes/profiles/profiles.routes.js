import express from "express"
import Joi from "joi"

import { authorize } from "../../auth/auth.controller.js"
import { asyncWrapper } from "../../helpers/asyncWrapper.js"
import validate from "../../helpers/validate.js"
import { addProfile, editProfile, deleteProfile } from "./profiles.controller.js"

const Router = express.Router
const router = Router()

const addProfileSchema = Joi.object({
    nameProfile: Joi.string().required(),
    gender: Joi.string().required(),
    birthdate: Joi.string().required(),
    city: Joi.string().required()
})
const editProfileSchema = Joi.object({
    nameProfile: Joi.string(),
    gender: Joi.string(),
    birthdate: Joi.string(),
    city: Joi.string(),
    _id: Joi.string()
})

router.post("/",
    asyncWrapper(authorize),
    validate(addProfileSchema),
    asyncWrapper(addProfile)
)
router.patch("/:_id",
    asyncWrapper(authorize),
    validate(addProfileSchema),
    validate(editProfileSchema, "params"),
    asyncWrapper(editProfile)
)
router.delete("/:_id",
    asyncWrapper(authorize),
    validate(editProfileSchema, "params"),
    asyncWrapper(deleteProfile)
)

export default router