import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRouters from './routes/authRoute.js'
import cors from 'cors';
dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/auth',authRouters);

app.get('/',(req, res) => {
    res.send("<h1>Sendign Rsponse</h1>")
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server runnig on port ${PORT}`.bgCyan.white)
})