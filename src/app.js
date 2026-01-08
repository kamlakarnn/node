const express = require("express")

const app = express()

app.get("/detail/:user_id",(req,res)=>{
    //console.log(req.query);

    console.log(req.params.user_id);
    
    
    res.send("get the details of data")
})

app.post("/insert",(req,res)=>{
    res.send("inserted data successfully")
})

app.delete("/delete",(req,res)=>{
    res.send("delete the data sucessfully")
})

app.get("/data",(req,res)=>{
    res.send("data sucessfully")
})

app.use("/",(req,res)=>{
    res.send("hellowesefweg")
})



app.listen(3000,()=>{
    console.log("listing port 3000");
    
});