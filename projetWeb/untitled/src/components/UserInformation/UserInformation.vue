<template>
    <div id="page">
        <h1>User Information</h1>
        <div id="contentPage">
            <div id="tableContainer">
                <div id="table">
                    <table>
                        <tbody>
                        <tr>
                            <td>Nickname</td>
                            <td><b-form-input size="sm" type="text" v-model="user.nickname" placeholder="Nickname" :class="{ 'missing' : user.nickname.trim() == ''}" /></td>
                        </tr>

                        <tr>
                            <td>First Name</td>
                            <td><b-form-input size="sm" type="text" v-model="user.firstName" placeholder="First Name" :class="{ 'missing' : user.firstName.trim() == ''}"/></td>
                        </tr>

                        <tr>
                            <td>Last Name</td>
                            <td><b-form-input size="sm" type="text" v-model="user.lastName" placeholder="Last Name" :class="{ 'missing' : user.lastName.trim() == ''}"/></td>
                        </tr>

                        <tr>
                            <td>Sex</td>
                            <td>
                                    <span v-for="sex in sexes" :key="sex">
                                        <input style="" type="radio" class="radio-inline" v-model="user.sex" :value="sex"/> {{sex}}
                                    </span>
                            </td>
                        </tr>

                        <tr>
                            <td>Address</td>
                            <td><b-form-input size="sm" type="text" v-model="user.address" placeholder="Address"/></td>
                        </tr>

                        <tr>
                            <td>Country</td>
                            <select id="country" name="country" v-model="user.country" >
                                <option disabled> --- </option>
                                <option value="" disabled selected>Select your country</option>
                                <option v-for="country in countries" :key="country" :value="country"> {{country.name}}</option>
                            </select>
                        </tr>

                        <tr>
                            <td>
                                <span>Phone </span>
                                <span v-if="user.country.callingCode">(+{{user.country.callingCode[0]}})</span>
                            </td>
                            <td>
                                <b-form-input size="sm" type="text" v-model="user.phone" placeholder="Phone Number"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <user-card class="user-card" :user="user"></user-card>
        </div>

        <div>
            <b-button v-if="formFilled" class="btn btn-outline-light" @click="updateInformation" size="sm">Update Information</b-button>
            <span v-else>Please fill in all required fields</span>
        </div>
    </div>
</template>

<script>
    import User from "../../model/User.js"
    import UserCard from "../UserCard/UserCard"

    const countries = [
        {
            "name": "France",
            "callingCode" : ["33"]
        },
        {
            "name": "Belgium",
            "callingCode" : ["32"]
        },
        {
            "name": "Germany",
            "callingCode" : ["49"]
        },
        {
            "name": "United States of America",
            "callingCode" : ["1"]
        }
    ]

    const sexes = ['male', 'female'];
    const genders = {
        'male': "Mr",
        'female' : "Mrs"
    }

    export default {
        name: "UserInformation",
        components: {UserCard},
        data: function () {
            return {
                user: new User(),
                countries: countries,
                sexes: sexes,
                genders: genders
            }
        },
        computed: {
            formFilled: function(){
                return this.user.nickname.trim() !== ''
                    && this.user.firstName.trim() !== ''
                    && this.user.lastName.trim() !== '' ;
            }
        },
        methods: {
            updateInformation: function () {
                alert("Not implemented yet !")
            }
        }
    }

</script>

<style scoped>

    #page{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

    table{
        text-align: left;
    }

    #contentPage{
        display: flex;
        flex-direction: row;
    }

    #tableContainer{
        flex-grow: 1;
        justify-content: center;
    }

    #table{
        display: inline-block;
    }


    #country{
        background-color: white;
        position: relative;
        font-family: Arial;
    }

    .missing{
        background: lightpink;
    }
</style>