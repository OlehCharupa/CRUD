import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { getPaths } from "./helpers/utils.js";

import authRouter from "./auth/auth.routes.js"
import userRouter from "./routes/user/user.routes.js"
import profileRouter from "./routes/profiles/profiles.routes.js"



export default class Server {
    constructor() {
        this.server = null
    }

    async start() {
        this.initServer();
        this.initMiddlewares();
        this.initConfig();
        this.initRoutes();
        await this.initDataBase();
        this.initErrorHandling();
        this.initListening()
    }

    initServer() {
        this.server = express()
    }

    initConfig() {
        const { __dirname } = getPaths(import.meta.url);
        dotenv.config({ path: path.join(__dirname, "../.env") })
    }

    initMiddlewares() {
        this.server.use(express.json())
        this.server.use(cors())
    }

    async initDataBase() {
        try {
            await mongoose.connect(process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            });
            console.log("Database connection is successful");
        } catch (error) {
            console.log("Database connection failed", error);
            process.exit(1)
        }
    }

    initRoutes() {
        this.server.use("/auth", authRouter)
        this.server.use("/profile", profileRouter)
        this.server.use("/user", userRouter)
    }

    initErrorHandling() {
        this.server.use(
            (error, req, res, next) => {
                let stausCode = error.status || 500;
                console.log(error);
                return res.status(stausCode).send(error.message)
            }
        )
    }

    initListening() {
        this.server.listen(process.env.PORT || 5000, () => console.log("Started listening on port", process.env.PORT))
    }
}



