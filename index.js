import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import friendRouter from "./routes/friendRouter.js";
dotenv.config({path: '.env'})

const domainsFromEnv = process.env.CORS_DOMAINS || ""
const port = process.env.PORT || 3003

const whitelist = domainsFromEnv.split(",").map(item => item.trim())

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}

const app = express();


app.use(cors("Access-Control-Allow-Origin: *"))

app.get('/', (req, res) => res.status(200).send("ShareDine FriendsAPI"))

app.use("/friends", cors(), friendRouter)

app.listen(3003) // verander de port als dit al in gebruik is

