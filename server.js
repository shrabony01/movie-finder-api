import "dotenv/config";
import express from "express";

//express and the port
const app = express();
const port=process.env.PORT||3001;

app.use(express.json()); //aloowing the app to read json data

app.get("/",function(req,res){
    res.json({message: "Movie finder api is running!"});
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})