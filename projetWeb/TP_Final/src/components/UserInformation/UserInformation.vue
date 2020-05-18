<template>
    <div class="user-information">

        <h2 style="text-align: center">User Information</h2>

        <b-form class="content">

            <div class="user-data">
                <table>
                    <tr>
                        <td>Nickname</td><td><b-form-input type="text" v-model="user.nick" :class="{ 'missing' : user.nick.trim() == '' }"/></td>
                    </tr>
                    <tr>
                        <td>First Name</td><td><b-form-input type="text" v-model="user.fname" :class="{ 'missing' : user.fname.trim() == '' }"/></td>
                    </tr>
                    <tr>
                        <td>Last Name</td><td><b-form-input type="text" v-model="user.lname" :class="{ 'missing' : user.lname.trim() == '' }"/></td>
                    </tr>
                    <tr>
                        <td>Sex</td>
                        <td style="text-align: left">
                            <b-form-radio-group v-model="user.sex">
                                <b-form-radio style="width: auto" v-for="sex in sexes" :value="sex">{{sex}}</b-form-radio>
                            </b-form-radio-group>
                        </td>
                    </tr>
                    <tr>
                        <td>Address</td><td><b-form-input required type="text" v-model="user.address"/></td>
                    </tr>
                    <tr v-if="countries.length !== 0">
                        <td>Country</td>
                        <td>
                            <b-form-select v-model="user.country">
                                <option disabled>---</option>
                                <option v-for="country in countries" :value="country">{{country.name}}</option>
                            </b-form-select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div style="display: flex ; flex-direction: row ; align-items: baseline">
                                <span>Phone</span>
                                <span style="flex: 1"></span>
                                <span v-if="user.country.callingCodes" style="font-size: 0.7em">(+{{user.country.callingCodes[0]}})</span>
                            </div>
                        </td>
                        <td><b-form-input type="text" v-model="user.phone"/></td>
                    </tr>
                </table>
            </div>

            <user-card class="user-card" :user="user"></user-card>

        </b-form>

        <div style="margin-top: 30px ; text-align: center">
            <div>
                <b-button @click="updateInformation" variant="primary" :disabled="!formFilled">Update Information</b-button> &nbsp;
                <b-button @click="cancel">Cancel</b-button>
            </div>
            <span v-show="!formFilled" style="color: red">Please fill in all required fields</span>
        </div>

    </div>
</template>

<script>

    import UserCard from "../UserCard/UserCard"
    import User from "../../../../vue_tp_04/src/models/ex09_User"

    import MagicCountries from "../../api/magic_countries"

    const countries = []

    const sexes =['male', 'female'] ;

    export default {
        name: "UserInformation",
        props: {
            userData: User
        },
        data: function(){
            console.log("data")
            return {
                user: new User(),
                countries: countries,
                sexes: sexes,
            }
        },
        components: {
            'user-card': UserCard
        },
        computed: {
            formFilled: function () {
                return this.user.nick.trim() !== ''
                    && this.user.fname.trim() !== ''
                    && this.user.lname.trim() !=='' ;
            }
        },
        methods: {
            updateInformation: function () {

                // On imagine lancer la requete sur le serveur...
                this.$emit('user-mutated', this.user) ;

            },
            updateUserData: function (userData) {
                this.user = new User() ;
                if(userData){
                    this.user.fromJSON(userData.jsonify())
                }
            },
            cancel: function () {
                if(this.userData) this.updateUserData(this.userData)
            }
        },
        mounted: function () {

            MagicCountries.getAll().then(
                result => {
                    this.countries = result ;
                },
                error => {
                    console.log(error)
                }
            )

            this.updateUserData(this.userData) ;
        },
        watch: {
            userData: {
                handler: function (newValue, oldValue) {
                    this.updateUserData(newValue) ;
                },
                deep: true
            }
        }
    }

</script>

<style scoped>

    input, select{
        width: 200px ;
    }

    .content {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
    }

    .user-data {
        flex: 1;
        display: flex;
    }

    .missing{
        background: lightpink;
    }

    .user-card {
        max-width: 45%;
    }

</style>