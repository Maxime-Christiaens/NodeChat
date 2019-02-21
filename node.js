const express = require("express");
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const url = require('url');

const port = 5555;

//contiendra tout les users
let users = [];

//permet de déclarer des fichiers statiques pour recherche plus facilement les ressources
app.use(express.static(__dirname + '/node_modules/socket.io-client'));
app.use(express.static(__dirname + '/'));
app.get('/', (req, res) => res.sendFile(__dirname + "/view/index.html"));

// Quand un client se connecte alors ...
io.sockets.on('connection', function (socket) {
    //on emet dans la console le message ci-dessous
    console.log('Un client est connecté !');
    //on lance une message au client
    socket.emit('message', 'yo');
    socket.on('message', function (message) {
        console.log('Un client me parle ! Il me dit : ' + message);
    });
    socket.pseudo = "Inconnu"
    /////////////////////////////////////////
    //regarde si la personne change de pseudo 
    socket.on('pseudo', (pseudo, clientID) => {
        socket.pseudo = pseudo, clientID;
        //envoi l'info du pseudo et de son ID au client
        io.emit('pseudo', pseudo, clientID)
        ////****Incrémenter dans la base de données les pseudos */
        users.push(pseudo);
        ///Envoie la liste des users au client
        io.emit('users', users)
        console.log("voici les users :" + users)
        return users;
    })
    ///////////////////
    //récéption du chat
    socket.on("chat", (msg, send) => {
        //socket.CEQUETUVEUX permet de stocker tout ce que tu veux LOL // un peu comme les this.state.SOMETHING / this.props.SOMETHING en reactJS
        console.log(msg +" from "+ socket.pseudo +" to "+ send);
        socket.chat = msg;
        io.emit("chat", msg, socket.pseudo, send);
    })
    //console log le socket.client d'un client
    console.log("socket.id:");
});

http.listen(port, function () {
    console.log(`Server running at http://localhost:${port}/`);
});