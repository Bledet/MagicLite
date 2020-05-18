
// recuperer le bouton avec l'id "btn"
/*let btn = document.getElementById('btn')
btn.addEventListener('click', shuffle)

let redcard = 0;

shuffle()*/

var callBackGetSuccess = function(data){
    console.log("donnees api: ", data)
    var element = document.getElementById("hand");
    element.innerHTML += '<div class="card" onclick="flip(event)"><img class="backbot" src="'+data.image_uris.normal+'"/></div>';
}

function buttonClickGET(){
    var url = "https://api.scryfall.com/cards/named?exact=athreos-shroud-veiled";

    $.get(url, callBackGetSuccess).done(function(){
        //alert("second success")
    })
        .fail(function(){
            alert("error");
        })
        .always(function(){
            //alert("finished")
        })
}




/*
function shuffle() {
    let allcards = document.getElementsByClassName("card-img");
    allcards[redcard].setAttribute('src', "images/black.png")
    let random = Math.floor(Math.random() * allcards.length); // un nombre au hasard
    let card = allcards[random];
    card.setAttribute('src', "images/red.png");
    redcard = random
}


function flip(event){
    let element = event.currentTarget;
    if (element.className === "card"){
        if(element.style.transform == "rotateY(180deg)"){
            element.style.transform = "rotateY(0deg)";
        }
        else{
            element.style.transform = "rotateY(180deg)";
        }
    }
}
*/