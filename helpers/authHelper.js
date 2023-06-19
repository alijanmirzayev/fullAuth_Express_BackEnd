import { hash, genSalt, compare } from 'bcrypt'

export const BCRYPT = {
    hashPassword: async (password) => {
        try {
            const salt = await genSalt()
            const hashedPassword = await hash(password, salt)
            return hashedPassword
        } catch (error) {
            console.log('Bcrypt/hashPassword', error)
        }
    },
    comparePassword: async (password, hashedPassword) => {
        const result =  await compare(password, hashedPassword)
        return result
    }
}