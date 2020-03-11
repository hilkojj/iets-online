import {Users} from "./users";
import {Sessions} from "./sessions";
import {Socket} from "socket.io";
import {User} from "../common/models/User";
import * as fs from "fs";

const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)

const port = 8080

app.use(bodyParser())
app.use(bodyParser.json())

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
    next()
})

app.use("/", express.static(__dirname + "/../../client/"));

fs.mkdir("./data", err => err && console.error)

const users = new Users()
const sessions = new Sessions()

io.on("connection", (socket: Socket) => {
    console.log("socket connection", socket.id)

    socket.on("login", (username: string) => {
        if (sessions.getSessionFor(socket)) return // user is already logged in

        if (typeof username != "string") return

        let user = users.createUser(username) || users.getUserByName(username)
        if (user) {
            let session = sessions.createSessionFor(user as User, socket)

            console.log("session for", user.name, "created")

            socket.on("disconnect", () => {
                sessions.endSessionFor(socket)

                console.log("session for", user.name, "ended")
            })
        }
    })
})

http.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
})
