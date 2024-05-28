const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override")
const Chat = require("./models/chat.js");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({ extended : true }));
app.use(methodOverride("_method"));
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}



app.get("/chats", async (req, res) => {
    let chats= await Chat.find();
    // console.log(chat);
    res.render("index.ejs",{ chats });
}
);

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/chats",(req,res)=>{
    let {from,msg,to }= req.body;
    let newchat = new Chat({
        from:from,
        to:to,
        message:msg,
        created_at: new Date()
    });
    newchat.save().then((res)=>{
        console.log("chat was saved");
    }).catch((err)=>{
        console.log(err)
    });
    res.redirect("/chats");
})

app.get("/chats/:id/edit", async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
    
})

app.put("/chats/:id",async(req,res)=>{
    let {id} =req.params;
    let {message: newmsg}=req.body;
    console.log(newmsg);
    let updatedchat =await Chat.findByIdAndUpdate(id,{message:newmsg},{runValidators:true,new :true});
    console.log(updatedchat);
    res.redirect("/chats")
})


app.delete("/chats/:id",async(req,res)=>{
    let {id} =req.params;
    let chatToBeDeleted=await Chat.findByIdAndDelete(id)
    console.log(chatToBeDeleted);
    res.redirect("/chats")

})

app.listen(8080, () => {
    console.log("server running");
});
