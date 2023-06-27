import notifier from "node-notifier"
import express from "express"
import morgan from "morgan"

import Routes from "./routes.js"
import "./database/Connect.js"

const server = express()

server.set("view engine", "pug")
server.set("views", "./src/views")

server.use(morgan("dev"))
server.use(express.json())
server.use(express.urlencoded({ extended : true }))
server.use(express.static("./src/public"))

server.use(Routes)

server.listen(3000, function() {
    notifier.notify({
        title: "tcc project",
        message:"server working",
        icon: "./src/public/favicon.png"
    })
})

