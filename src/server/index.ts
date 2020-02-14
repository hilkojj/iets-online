import {testFun} from "../common/test"

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

testFun()

io.on("connection", socket => {
    console.log("socket connection")
})

http.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
})
