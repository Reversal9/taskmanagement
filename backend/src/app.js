import express from "express";
import mongoose from "mongoose";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(routes);

const PORT = process.env.PORT || 5000;

const uri = `mongodb://127.0.0.1:27017/taskmanagement`;

mongoose
    .connect(uri)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch(error => {
        throw error
    });