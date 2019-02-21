//crée la connexion bilatérale synchrone
const socket = io()
const formuPseudo = document.getElementById("formuPseudo")
const formu = document.getElementById("form")
const chat = document.getElementById("chat")
const name = document.getElementById("name") 
const willy = document.getElementById("willy") 

//reçoit le message
function myFunction(){
    socket.emit('message', 'Salut serveur, ça va ?');
}

formuPseudo.addEventListener("submit",function(e){
    e.preventDefault(); //permet de ne pas recharger la page :) :DDDDDDDDD
    //envoie dans le serveur le pseudo ainsi que l'id du client
    let clientID = socket.id
    socket.emit("pseudo", pseudo.value, clientID)
    return false; //complément de e.preventDefault(); 
})
//Permet de récupérer le pseudo qui a été stocké par le serveur
socket.on("pseudo", function(pseudoData, ID){
    let pseudo = pseudoData;
    console.log(pseudo);
    console.log("id = "+ID)
    console.log("client id ="+socket.id)
    //si l'id récupérer est égale à l'id du client alors il l'affiche en modifiant le texte de l'html mais uniquement du bon client
    if (ID == socket.id){
        name.innerText = ("Hello " + pseudo)
    } 
})

formu.addEventListener("submit",function(e){
    e.preventDefault(); //permet de ne pas recharger la page :) :DDDDDDDDD
    socket.emit("chat", chat.value)
    return false; //complément de e.preventDefault(); 
})
/////////////////////////////////////////////
//récupère et affiche le message dans le chat
socket.on("chat", function(data, pseudo){
    //crée l'élément p (paragraphe) stocké dans une variable
    let p = document.createElement("p");
    //génère l'heure 
    let now = new Date();
    //écrit dans la paragraphe le pseudo l'heure et le message
    p.innerText = pseudo+" : "+now.getHours()+"h"+now.getMinutes()+" : "+data;
    //crée un enfant à willy (la div)
    willy.appendChild(p)
})
