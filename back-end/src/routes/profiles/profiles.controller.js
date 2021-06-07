import ProfileModel from "./profiles.model.js"


export const addProfile = async (req, res) => {
    const user = req.user
    const { nameProfile, gender, birthdate, city } = req.body
    const profile = await ProfileModel.create({
        nameProfile,
        gender,
        birthdate,
        city,
    })
    user.profiles.push(profile)
    await user.save()

    res.status(201).send(profile)
}

export const editProfile = async (req, res) => {
    const { _id } = req.params
    const profile = await ProfileModel.findByIdAndUpdate(_id, { $set: req.body }, { new: true })
    if (!profile) {
        res.status(404).send({ message: "Profile not found" })
    }
    return res.status(200).send(profile
    )
}

export const deleteProfile = async (req, res, next) => {
    const { _id } = req.params;
    const profile = await ProfileModel.findByIdAndDelete(_id)
    if (!profile) {
        return res.status(404).send({ message: "Profile not found" })
    }
    return res.status(204).send({ message: "Profile deleted" })
}