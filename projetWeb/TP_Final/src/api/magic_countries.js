// npm install axios
import axios from 'axios'

export default class MagicCountries {}

MagicCountries.countries = undefined ;

MagicCountries.getAll = function(){

    return new Promise((resolve, reject) =>{
        if(MagicCountries.countries){
            resolve(MagicCountries.countries) ;
        }else{
            axios({method: "GET", "url": "https://restcountries.eu/rest/v2/all"}).then(
                result => {
                    MagicCountries.countries = result.data ;
                    resolve(MagicCountries.countries)
                }, error => {
                    reject(error)
                });
        }
    })

}