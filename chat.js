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
    socket.emit("pseudo", pseudo.value)
    return false; //complément de e.preventDefault(); 
})

socket.on("pseudo", function(data){
    let pseudo = data;
    console.log(pseudo);
    name.innerText = ("Hello " + pseudo)
})

formu.addEventListener("submit",function(e){
    e.preventDefault(); //permet de ne pas recharger la page :) :DDDDDDDDD
    socket.emit("chat", chat.value)
    return false; //complément de e.preventDefault(); 
})

socket.on("chat", function(data, pseudo){
    let p = document.createElement("p");
    //génère l'heure 
    let now = new Date();
    let hour = 
    //renvoi le message avec le pseudo et l'heure
    p.innerText = pseudo+" : "+now.getHours()+"h"+now.getMinutes()+" : "+data;
    //crée un enfant à willy (la div)
    willy.appendChild(p)
})
