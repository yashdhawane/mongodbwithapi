const mongoose = require("mongoose");
const path = require("path");


const Chat = require("./models/chat.js");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats=[
    {
        from: "neha",
        to: "priya",
        message: "send",
        created_at: new Date(),
    }, {
        from: "ganesh",
        to: "priya",
        message: "send",
        created_at: new Date(),
    }, {
        from: "neha",
        to: "yash",
        message: "send",
        created_at: new Date(),
    }, {
        from: "neha",
        to: "rahul",
        message: "send",
        created_at: new Date(),
    }, {
        from: "rahul",
        to: "priya",
        message: "send",
        created_at: new Date(),
    },
]

Chat.insertMany(allchats);