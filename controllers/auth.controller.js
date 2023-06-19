import { BCRYPT } from "../helpers/authHelper.js";
import { TOKEN } from "../helpers/tokenGenerator.js";
import { userModel } from "../models/user.model.js";
import { loginValidation } from "../validation/login.validation.js";
import { registerValidation } from "../validation/register.validation.js";

export const AuthController = {
    register: async (req, res) => {
        try {
            const data = await registerValidation(req.body)
            const hashedPassword = await BCRYPT.hashPassword(data.password)
            const createdData = await userModel.create({...data, password: hashedPassword})
            return res.status(201).send(createdData)
        } catch (error) {
            return res.status(500).send('Error: Auth.Register Server error!')
        }
    },
    login: async (req, res) => {
        try {
            // Data verification
            const data = await loginValidation(req.body)
            
            // Data find by Database
            const isExist = await userModel.find({email: data.email})
            if (isExist.length == 0) {
                return res.status(404).send('User not found!')
            }
            
            // Check password
            const checkPassword = await BCRYPT.comparePassword(data.password, isExist[0].password)
            if (!checkPassword) {
                return res.status(401).send('Wrong password!')
            }

            // Generate Token
            const token = TOKEN.generator(isExist[0].email, isExist[0]._id)
            return res.status(200).send({token})
        } catch (error) {
            return res.status(500).send('Error: Auth.Login Server error!')
        }
    }
}