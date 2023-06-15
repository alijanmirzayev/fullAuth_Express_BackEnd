import { BCRYPT } from "../helpers/authHelper.js";
import { userModel } from "../models/user.model.js";
import { registerValidation } from "../validation/register.validation.js";

export const AuthController = {
    register: async (req, res) => {
        try {
            const data = await registerValidation(req.body)
            const hashedPassword = await BCRYPT.hashPassword(data.password)
            const createdData = await userModel.create({...data, password: hashedPassword})
            return res.status(201).send(createdData)
        } catch (error) {
            console.log('Error: Auth.route', error)
            return res.status(500).send('Error: Auth.route Server error!')
        }
    },
}