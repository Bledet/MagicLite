var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var ent = require('ent');
var express = require('express');
var shuffle = require('shuffle-array');
// Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
// Chargement de la page index.html

var app

const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: fs.createReadStream('public/asset/deck.txt')
});
// Each new line emits an event - every time the stream receives \r, \n, or \r\n
rl.on('line', (line) => {
    line = line.split(" ").join("-");
    line = line.split("'").join("");
    line = line.split(",").join("");
    decker(line);
    //console.log(line);
});
rl.on('close', () => {
    shuffle(deck1);
    for (let i=0; i<deck1.length; i++){
        console.log(deck1[i]);
    }
    console.log('Done reading file');
});

var deck1 = new Array();

var callBackGetSuccess = function(data){
    var element = document.getElementById("hand");
    element.innerHTML += '<div class="card" onclick="flip(event)"><img class="backbot" src="'+data.image_uris.normal+'"/></div>';
}

function pioche(){
    str="null";

    str=deck1.pop();

    console.log("CARTE PIOCHE:"+str);
    console.log("TAILLE DU DECK:"+deck1.length);

    return str;
/*
    var url = "https://api.scryfall.com/cards/named?exact=Nightmare-Shepherd";

    $.get(url, callBackGetSuccess).done(function(){
        //alert("second success")
    })
        .fail(function(){
            alert("error");
        })
        .always(function(){
            //alert("finished")
        })*/
}

function decker(str){
    let nb = 0;
    if( str.substr(1,1).match("-")){
        nb = parseInt(str.substr(0,1));
        str = str.substr(2);
    }
    else{
        nb = parseInt(str.substr(0,2));
        str = str.substr(3);
    }
    for(let i=0; i<nb; i++){
        deck1.push(str);
    }
    //console.log("Taille du deck: "+deck1.length);
}

//shuffle(deck1);
//console.log(deck1);
/*
function print(){
    for (let i=0; i<deck1.length; i++){
        console.log(deck1[i]);
    }
}
*/

app.use('/public',express.static(__dirname +'/public'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});


io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('nouveau_client', pseudo);
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    });

    socket.on('action', function (action) {
        action = ent.encode(action);
        console.log(socket.pseudo+" dit : "+action);
        str = pioche();
        socket.emit('action', str);
        socket.broadcast.emit('action', "piocheadverse");
    });

});

server.listen(8080);
