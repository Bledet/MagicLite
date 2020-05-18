<template>
    <div class="user-card">
        <div style="display: flex ; flex-direction: row ; align-items: center">
            <div>
                <img :src="require('./assets/baseline_face_black_48dp.png')"/>
            </div>
            <div style="flex: 1"></div>
            <div class="info">
                <span class="pseudo">{{ user.nick }}</span>
                <span>{{ this.genders[user.sex] }} {{ fullName }}</span>
            </div>
        </div>
        <div class="details">
            <div>{{ user.address }} <span v-if="user.country.name">{{ user.country.name }}</span></div>
            <div v-if="user.phone">{{ fullPhone }}</div>
        </div>
    </div>
</template>

<script>

    import User from "../../../../vue_tp_04/src/models/ex09_User"

    function capitalize(value){
        if (!value) return ''
        value = value.toString().trim()
        return value.charAt(0).toUpperCase() + value.slice(1) ;
    }

    const genders = {
        'male': "Mr",
        'female': "Mrs"
    }

    export default {
        name: "UserCard",
        props: {
            user: User
        },
        data: function(){
            return {
                genders: genders
            }
        },
        computed: {
            fullName : function () {
                return capitalize(this.user.fname) + " " + capitalize(this.user.lname)
            },
            fullPhone: function () {
                return this.user.country.callingCodes
                    ? "(+ " + this.user.country.callingCodes[0] + " ) " + this.user.phone
                    : this.user.phone ;
            },
        },
        filters: {
            capitalize: capitalize
        },
    }
</script>

<style scoped>
    .user-card {
        min-width: 200px;
        border: 1px solid lightgray;
        background: white;
        padding: 5px;
        text-align: center;
    }

    .info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 0.9em;
    }

    .pseudo {
        font-weight: bold;
    }

    .details {
        margin: 3px 10px;
        font-size: 0.8em;
    }
</style>