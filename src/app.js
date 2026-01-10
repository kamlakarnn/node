const express = require("express")

const app = express()

// app.get("/detail/:user_id",(req,res)=>{
//     //console.log(req.query);

//     console.log(req.params.user_id);
    
    
//     res.send("get the details of data")
// })

// app.post("/insert",(req,res)=>{
//     res.send("inserted data successfully")
// })

// app.delete("/delete",(req,res)=>{
//     res.send("delete the data sucessfully")
// })

// app.get("/data",(req,res)=>{
//     res.send("data sucessfully")
// })

// app.use("/",(req,res)=>{
//     res.send("hellowesefweg")
// })

app.use("/",
    
    (req,res , next)=>{
      res.send("hellowesefweg")

    console.log("hi ist req handler");
    
 next();
},

    (req,res)=>{
    res.send("hello i am 2 nd handler")

    })

app.listen(4000,()=>{
    console.log("listing port 4000");
    
});