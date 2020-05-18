<template>
    <div id="card">
        <div id="cardContent">
            <div id="mainInfos">
                <div id="face"></div>
                <div id="info1">
                    <span id="nickname">{{ user.nickname }}</span> <br>
                    <span>{{ genders[user.sex] }} </span>
                    <span>{{ user.firstName | capitalize }}</span>
                    <span>{{" " + user.lastName | majuscules }}</span>
                </div>
            </div>

            <div id="mainInfos2">
                <span>{{ user.address}}</span> <br>
                <span>{{ user.country.name}}</span> <br>
                <span v-if="user.country.callingCode != NULL">{{"(+ " + user.country.callingCode + ") " + user.phone }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import User from "../../model/User.js"

    export default {
        name: "UserCard",
        props: {
            user: User
        },
        data: function () {
            return {
                genders: genders
            }
        },
        filters: {
            capitalize: capitalize,
            majuscules: majuscules
        }
    }

    function majuscules(value) {
        if(!value) return ''
        return value.toString().toUpperCase()
    }

    function capitalize(value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    }

    const genders = {
        'male': "Mr",
        'female' : "Mrs"
    }


</script>

<style scoped>
    #cardContent{
        flex-shrink: 1;
        display: inline-block;
        border: #545562 solid 1px;
        background-color: white;
        width: auto;
        min-width: 200px;

    }

    #mainInfos{
        display: flex;
        flex-direction: row;
    }

    #face{
        flex: 1;
        width: 48px;
        height: 48px;
        min-width: 48px;
        max-width: 48px;
        background: url("../../assets/face.png");
        background-position: left;
        background-size: contain;
        background-repeat: no-repeat;
    }

    #info1{
        flex-grow: 1;
        max-height: 48px;
    }

    #nickname{
        font-weight: bold;
    }

    #card{
        flex-grow: 1;
        justify-content: center;
    }
</style>