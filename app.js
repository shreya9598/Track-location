
const express = require("express")
const app = express();
const path = require("path");
const http = require("http");


const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname, "public")));


io.on("connection", (socket) =>{

    //accept location at backend sent from frontend
    socket.on("send-location", (data) => {
        io.emit("receive-location", {id: socket.id, ...data});  // send location to all connected devices  
    });

    socket.on("disconnect", ()=>{
        io.emit("user-disconnected", socket.id);
    })

    console.log("CONNECTED");
});


app.get("/", (req, res) => {
    res.render("index");
});

server.listen(5000);
