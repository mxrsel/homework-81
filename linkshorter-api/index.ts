import express from 'express';
import linkRouter from "./routers/linkRouter";
import config from "./config";
import cors from 'cors'
import mongoose from "mongoose";

const app = express();
const port = 8000;

app.use(cors(config.corsOptions))
app.use(express.static('public'));
app.use(express.json());
app.use('/links', linkRouter);


const run = async() => {
    await mongoose.connect('mongodb://localhost/links')

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect()
    });
};

run().catch(console.error);