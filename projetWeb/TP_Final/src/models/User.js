export default class User {
    constructor() {
        this.nick = ''
        this.fname = ''
        this.lname = ''
        this.sex = ''
        this.address = ''
        this.country = {}
        this.phone = ''
        this.cards = []
    }

    jsonify(){
        return JSON.stringify(this)
    }

    fromJSON(json){
        let object = JSON.parse(json)
        this.nick = object.nick ;
        this.fname = object.fname ;
        this.lname = object.lname ;
        this.sex = object.sex ;
        this.address = object.address ;
        this.country = object.country ;
        this.phone = object.phone ;
        this.cards = object.cards ;
    }

}
