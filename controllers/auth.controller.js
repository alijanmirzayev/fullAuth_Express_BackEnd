import { BCRYPT } from "../helpers/authHelper.js";
import { mailSender } from "../helpers/mailSender.js";
import { TOKEN } from "../helpers/tokenHelper.js";
import { userModel } from "../models/user.model.js";
import { forgotValidation } from "../validation/forgot.validation.js";
import { loginValidation } from "../validation/login.validation.js";
import { registerValidation } from "../validation/register.validation.js";

export const AuthController = {
    register: async (req, res) => {
        try {
            // Data verification
            const data = await registerValidation(req.body)

            // Password Hash
            const hashedPassword = await BCRYPT.hashPassword(data.password)

            // User create
            const createdData = await userModel.create({ ...data, password: hashedPassword })

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
            const isExist = await userModel.find({ email: data.email })
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
            return res.status(200).send({ token })
        } catch (error) {
            return res.status(500).send('Error: Auth.Login Server error!')
        }
    },
    forgotPassword: async () => {
        // Email Verification
        const data = await forgotValidation(req.body)

        // Data find by Database
        const isExist = await userModel.find({ email: data.email })

        if (isExist == 0) {
            return res.status(404).send('User not found!')
        }
        // Token Generator
        const token = TOKEN.generator(data.email, id)

        mailSender(data.email, token)
    },
    recovery: async () => {
        try {
            const token = req.params.token
            if (!token) {
                return res.status(400).send('Token is invalid')
            }

            const verify = TOKEN.verify(token)

            const hashedPassword = await BCRYPT.hashPassword(req.body.password)
            const updateData = await userModel.findOneAndUpdate({ email: verify.email }, { $set: { password: hashedPassword } })
            return res.status(200).send(updateData)
        } catch (error) {
            return res.status(400).send('Recovery: Error')
        }
    }
}