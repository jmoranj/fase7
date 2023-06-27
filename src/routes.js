import express from "express"
import res from "express/lib/response.js"
import { Types, isValidObjectId } from "mongoose"
import { post, user } from "./database/Model.js"

const Routes = express.Router()

Routes.get("/homepage", async function(req, res){
    await post.find()   
        .then(function(results){
            console.log(results)
            res.render("homepage.pug", { "results" : results })
        })

        .catch(function(error){
            console.log(error.message)
            res.status(500).send(error.message)
        })
})

Routes.get("/post/:code", async function(req, res){
    const { code } = req.params
    if(isValidObjectId(code)){
        await post.findById( Types.ObjectId(code))
            .then(function(result) {
                console.log(result)
                res.render("post.pug", {"result" : result})
            })
            .catch(function(error) {
                console.log(error.message)
                res.status(500).send(error.message)
            })
    }
    else res.render("code.pug")
    
})

Routes.get("/topost", async function(req, res){
    res.render("topost.pug")
})

Routes.post("/topost", async function(req, res){
    const body = req.body

    console.log(body)

    const newpost = new post({
        description: body.description,
        content: body.content,
        username: body.username,
        date_post: body.date_post,
        active: body.active == "on" ? true : false
    })

    const result = await newpost.save()
    console.log(result)
    res.redirect("/homepage")
})


Routes.get("/", function(req, res){
    res.render("enter.pug")
})

Routes.post("/enter", async function(req, res){
    const { email, password } = req.body

    await user.findOne({
        email: email,
        password: password
    })

        .then(function(result){
            if (Object.keys(result || {}).length > 0)
                res.redirect("/homepage")
            else
                res.redirect("/")        
        })

        .catch(function(error){
            console.log(error.message)
            res.status(500).send(error.message)
        })
})

Routes.post("/register", async function(req, res){
    const { username, email, password } = req.body

    const newuser = new user({
        username: username,
        email: email,
        password: password
    })
    await newuser.save()

        .then(function(){
            res.redirect("/homepage")
        })

        .catch(function(error){
            res.status(500).send(error.message)
        })

})  

Routes.get("*", function(req, res){
    res.render("404.pug")
})

export default Routes 