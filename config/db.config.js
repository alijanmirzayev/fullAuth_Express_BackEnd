import mongoose from "mongoose"

export const dbConnect = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected')
        return
    } catch (error) {
        console.log(error)
        return
    }
}