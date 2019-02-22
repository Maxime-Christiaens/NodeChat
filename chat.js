//crée la connexion bilatérale synchrone
const socket = io()
const formuPseudo = document.getElementById("formuPseudo")
const formu = document.getElementById("form")
const chat = document.getElementById("chat")
const name = document.getElementById("name") 
const send = document.getElementById("send") 
const willy = document.getElementById("willy") 

//test
console.log(send)
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
socket.on("pseudo", function(pseudo, ID){
    
    //création d'un select en fonction d'un client
    let option = document.createElement("option")
    //l'option contient le pseudo en texte
    option.innerText = pseudo;
    //l'option contient l'id de la personne en value
    option.value = ID

    //crée l'option uniquement si ce n'est pas son pseudo, sinon on pourrait s'envoyer un message à soi-même ce qui ne sert pas à grand chose :3 
    if (ID != socket.id){
        let toCreat = true;
        //permet de modifier son pseudo et d'éviter qu'il se crée plusieurs fois 
        for (let i = 0; i < document.querySelectorAll("option").length; i++){
            if (document.querySelectorAll("option")[i].value == ID){
                document.querySelectorAll("option")[i].innerText = pseudo
                toCreat = false // désactive la création du pseudo car il existe déjà
            }
        }   
        if(toCreat){
            send.appendChild(option)
        } 
    }
    //si l'id récupérer est égale à l'id du client alors il l'affiche en modifiant le texte de l'html mais uniquement du bon client
    if (ID == socket.id){
        name.innerText = ("Hello " + pseudo)
    }
})

formu.addEventListener("submit",function(e){
    e.preventDefault(); //permet de ne pas recharger la page :) :DDDDDDDDD
    console.log(send.value)
    socket.emit("chat", chat.value, send.value)
    return false; //complément de e.preventDefault(); 
})
/////////////////////////////////////////////
//récupère et affiche le message dans le chat
socket.on("chat", function(msg, pseudo, send){
    //crée l'élément p (paragraphe) stocké dans une variable
    let p = document.createElement("p");
    //génère l'heure 
    let now = new Date();
    //écrit dans la paragraphe le pseudo l'heure et le message
    if (send == "everyone"){
        p.innerText = pseudo+" : "+now.getHours()+"h"+now.getMinutes()+" : "+msg;
    }
    else if (send == socket.id){
        p.innerText = "Whisper : from "+pseudo+" : "+now.getHours()+"h"+now.getMinutes()+" : "+msg;
    }  
    //crée un enfant à willy (la div)
    willy.appendChild(p)
})
