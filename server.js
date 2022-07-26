const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const io = require("socket.io")(http, {
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"]
    }
  });


let users = [];
let messages = [];

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Khoi2912:Khoi2912@cluster0.43j270i.mongodb.net/?retryWrites=true&w=majority");
const ChatSchema = mongoose.Schema({
	username: String,
	msg: String,
  
});

const ChatModel = mongoose.model("chat", ChatSchema); 

ChatModel.find((err, result) => {
	if (err) throw err;

	messages = result;
});




io.on('connection', function(socket) { 
	socket.emit('loggedIn', { 
		users: users.map(s => s.username),
		messages: messages
	});

	socket.on('newuser', function(username){ 
		console.log(`${username} has arrived at the party.`);
		socket.username = username;
		
		users.push(socket);

		io.emit('userOnline', socket.username);
	});
  

	socket.on('msg',function(msg) {
		let message =new ChatModel( {
			username: socket.username,
			msg: msg,
            
		});
        
        message.save((err, result) => {
			if (err) throw err;

			messages.push(result);

			io.emit('msg', result);
		});
    });
    socket.on('level',function(level) {
		let message =new ChatModel( {
			username: socket.username,
			level:level,
             
		});
        
        message.save((err, result) => {
			if (err) throw err;

			messages.push(result);

			io.emit('msg', result);
		});
    });
    
    //Disconnect
    socket.on("disconnect", () => {
		console.log(`${socket.username} has left the party.`);
		io.emit("userLeft", socket.username);
		users.splice(users.indexOf(socket), 1);
	});


});



http.listen(process.env.PORT|| 3005,() => {

	
   console.log("App listening at http://localhost:%s",port)
});
