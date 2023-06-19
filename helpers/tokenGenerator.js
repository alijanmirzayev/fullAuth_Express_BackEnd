import jwt from 'jsonwebtoken'

export const TOKEN = {
    generator: (email, userId) => {
        const token = jwt.sign({ email, id: userId }, process.env.JWT_SECRET)
        return token
    }
}