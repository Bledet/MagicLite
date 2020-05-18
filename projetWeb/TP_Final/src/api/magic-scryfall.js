import axios from 'axios'

export default class MagicScryfall {}

const CARDS_URL = "https://api.scryfall.com/cards" ;
const CARDS_NAMED_URL = CARDS_URL + "/search";

const MAX_SCRYFALL_CARDS_PER_PAGE = 175 ;
const MAX_MAGIC_CARDS_PER_PAGE = 5 ;
const MAGIC_PAGES_PER_LOAD = MAX_SCRYFALL_CARDS_PER_PAGE / MAX_MAGIC_CARDS_PER_PAGE ; // 35

const MAX_SCRYFALL_PAGE = 1318 ;
MagicScryfall.MAX_MAGIC_PAGE = 46102 ;

var lastScryfallPage = undefined ;
var lastScryfallCards = undefined ;

MagicScryfall.getPage = function (page) {

    let scryfallPage = Math.trunc((page - 1) / MAGIC_PAGES_PER_LOAD) + 1;

    if(scryfallPage === lastScryfallPage){
        return new Promise((resolve) => {
            resolve(extractPage(page))
        }) ;
    }else{
        return new Promise((resolve, reject) => {

            axios({
                method: "get",
                url: CARDS_URL,
                params: {page: scryfallPage}
            }).then(
                result => {
                    lastScryfallPage = scryfallPage;
                    lastScryfallCards = result.data.data;
                    resolve(extractPage(page))
                }, error => {
                    reject(error)
                });

        })
    }

}

MagicScryfall.searchFor = function(string){
    return new Promise((resolve, reject) => {

        axios({
            method: "get",
            url: CARDS_NAMED_URL,
            params: {q: string}
        }).then(
            result => {
                resolve(result)
            }, error => {
                reject(error)
            });

    })
}

function extractPage(page){
    let slice = (page-1) % (MAGIC_PAGES_PER_LOAD) ;
    let start = (slice) * MAX_MAGIC_CARDS_PER_PAGE ;
    let end = start + MAX_MAGIC_CARDS_PER_PAGE ;
    return lastScryfallCards.slice(start, end) ;
}

