const express = require("express");
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const url = require('url');

const port = 5555;

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
    //regarde si la personne change de pseudo 
    socket.on('pseudo', (data) => {
        socket.pseudo = data;
        ////****Incrémenter dans la base de données les pseudos */
        io.emit('pseudo', data)
        //envoi l'info du pseudo au client
 
    })
    //récéption 
    //récéption du chat
    socket.on("chat", (data) => {
        //socket.CEQUETUVEUX permet de stocker tout ce que tu veux LOL // un peu comme les this.state.SOMETHING / this.props.SOMETHING en reactJS

        socket.chat = data;
        //console.log("message = "+data)
        io.emit("chat", data, socket.pseudo);
    })

});

http.listen(port, function () {
    console.log(`Server running at http://localhost:${port}/`);
});