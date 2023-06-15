import express from 'express';
import env from 'dotenv/config'
import { dbConnect } from './config/db.config.js';
import authRoutes from './routes/auth.route.js';

// CONFIGURATION
const app = express();
dbConnect()
app.use(express.json())

// ROUTES
app.use('/auth', authRoutes)

// SERVER
app.listen(process.env.PORT, ()=> {
    console.log(`Server is running. Port: ${process.env.PORT}`)
})