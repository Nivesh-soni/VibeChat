import {userModel} from '../models/user.model.js'

export const findByEmail = async(email) => {
    return await userModel.findOne({email})
}

export const createUser = async(payload) => {
    return await userModel.create(payload)
}