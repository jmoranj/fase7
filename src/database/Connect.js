import mongoose from "mongoose";
import "dotenv/config"

const adress = process.env.MONGO_URI

const settings = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    connectTimeoutMS: 5000
}

mongoose.set("strictQuery", true)

mongoose.connect(adress, settings)
    
    .then(function(){
        console.log("CONECTADO!")
    })

    .catch(function(error){
        console.log(error.message)
    })
