import jwt from 'jsonwebtoken'

export const TOKEN = {
    generator: (email, userId) => {
        const token = jwt.sign({ email, id: userId }, process.env.JWT_SECRET)
        return token
    },
    verify: (token) => {
        jwt.verify(token, process.env.JWT_SECRET, async (err, forget) => {
            if (err) {
                return res.status(401).send('Token is wrong!')
            }
            return forget
        })
    }
}