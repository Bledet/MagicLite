<template>
    <div class="content-cards">
        <h1>Cards</h1>

        <div class="cards-builder">
            <div class="magic-cards">
                <div class="list-title" style="flex-direction: row">
                    <div style="flex: 1 ; text-align: left">Magic Cards</div>
                    <b-button size="sm" variant="link" @click="magicSearching=!magicSearching">
                        <img :class="{'search-toggled': magicSearching}" src="../assets/baseline-search-black-18/1x/baseline_search_black_18dp.png">
                    </b-button>
                </div>
                <div class="cards-list">
                    <b-button-group v-if="!magicSearching" size="sm" style="display: flex" >
                        <b-button @click="firstCards" :disabled="page <= 1"> << </b-button>
                        <b-button @click="prevCards" :disabled="page <= 1"> < </b-button>
                        <b-button disabled style="flex: 1"> {{page}} / {{maxPage}} </b-button>
                        <b-button @click="nextCards" :disabled="page === maxPage"> > </b-button>
                        <b-button @click="lastCards" :disabled="page === maxPage"> >> </b-button>
                    </b-button-group>
                    <b-input-group v-else size="sm" prepend="Name">
                        <b-form-input v-model="magicSearch" v-on:keypress.enter.native="loadMagicSearch"/>
                        <b-input-group-append>
                            <b-btn size="sm" @click="loadMagicSearch">
                                Search
                            </b-btn>
                        </b-input-group-append>
                    </b-input-group>
                    <div class="cards-list-maxed">
                        <div :class="{ 'card-item': true, 'card-item-disabled': userHas(card) }" v-for="card in magicCards" :key="card.id">
                            <magic-card :card="card" :key="card.id"></magic-card>
                            <div class="card-item-button" @click="addCard(card)">
                                <img src="../assets/baseline-arrow_forward-black-18/1x/baseline_arrow_forward_black_18dp.png">
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="magic-cards">
                <div class="list-title" style="justify-content: center">
                    My Cards
                    <b-input-group size="sm" prepend="Search">
                        <b-form-input v-model="search"/>
                        <b-input-group-append>
                            <b-btn size="sm" @click="clearSearch">
                                <img src="../assets/baseline-close-black-18/1x/baseline_close_black_18dp.png">
                            </b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </div>
                <div class="cards-list cards-list-maxed">
                    <div class="card-item" v-for="card in orderedCards" :key="card.id">
                        <magic-card :card="card" :key="card.id"></magic-card>
                        <div class="card-item-button"  @click="removeCard(card)">
                            <img src="../assets/baseline-close-black-18/1x/baseline_close_black_18dp.png">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import User from "../models/User"
    import MagicScryfall from "../api/magic-scryfall"
    import MagicCard from "./MagicCard/MagicCard"

    // npm i lodash
    import _ from 'lodash'

    export default {
        name: "UserCards",
        props: {
            user: User
        },
        data: function () {
            return {
                magicCards: [],
                page: 1,
                search: '',
                filteredCards: [],
                magicSearching: false,
                magicSearch: ''
            }
        },
        components: {
            "magic-card": MagicCard
        },
        methods: {
            loadMagicCards: function(page) {
                MagicScryfall.getPage(page).then(
                    result => {
                        this.magicCards = result ;
                    }, error =>{
                        console.log("ERROR", error)
                    }
                )
            },
            loadMagicSearch: function() {
                MagicScryfall.searchFor(this.magicSearch).then(
                    result => {
                        this.magicCards = result.data.data ;
                    }, error =>{
                        this.magicCards = [] ;
                        console.log("ERROR", error)
                    }
                )
            },
            prevCards: function(){
                if(this.page <= 1 ) return ;
                this.page --
                this.loadMagicCards(this.page)
            },
            nextCards: function(){
                this.page ++
                this.loadMagicCards(this.page)
            },
            firstCards: function(){
                this.page = 1 ;
                this.loadMagicCards(this.page)
            },
            lastCards: function(){
                this.page = MagicScryfall.MAX_MAGIC_PAGE ;
                this.loadMagicCards(this.page)
            },
            addCard: function (card) {
                this.user.cards.push(card);
            },
            removeCard: function (card) {
                this.user.cards.splice(this.user.cards.indexOf(card), 1)
            },
            userHas: function (card){
                return this.user.cards.filter(c => c.id === card.id).length !== 0 ;
            },
            clearSearch: function(){
                this.search = '' ;
            },
            filterCards: function () {
                if(this.search.trim() === '') this.filteredCards = this.user.cards ;
                else this.filteredCards = this.user.cards.filter(card => card.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0)
            },
            // DEBOUNCE POUR EVITER DE RECALCULER À CHAQUE FRAPPE DE CLAVIER
            debouncedFilterCards : _.debounce(function(){ this.filterCards() ;}, 300)
        },
        computed: {
            orderedCards: function () {
                return _.orderBy(this.filteredCards, 'name')
            },
            maxPage : function () {
                return MagicScryfall.MAX_MAGIC_PAGE ;
            }
        },
        created: function () {
            this.loadMagicCards(this.page) ;
            this.filterCards() ;
        },
        watch:{
            search(){
                this.debouncedFilterCards() ;
            },
            'user.cards'(){
                this.filterCards() ;
            },
            magicSearching(){
                if(this.magicSearching){
                    if(this.magicSearch) this.loadMagicSearch()
                }else{
                    this.loadMagicCards(this.page);
                }
            }
        }
    }

</script>

<style scoped>

    .content-cards{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .cards-builder{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .magic-cards {
        margin: 0 5px ;
        min-width: 270px;
        display: flex;
        flex-direction: column;
    }

    .list-title{
        width: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;
        font-size: 1.5em;
    }

    .magic-card{
        border: none;
        width: 250px;
    }

    .cards-list{
        width: 270px;
        flex-direction: column;
        justify-content: space-around;
    }

    .cards-list-maxed{
        max-height: 590px ;
        overflow-x: scroll;
    }

    .card-item{
        margin-top: 5px ;
        border: 1px solid black;
        background: white;
        display: flex;
        flex-direction: row;
        flex: none;
    }

    .card-item-button{
        background: lightgray;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .card-item-disabled {
        opacity: 0.2;
    }

    .card-item-disabled .card-item-button{
        display: none;
    }

    .btn:focus, .input:focus,
    .btn:active {
        box-shadow: none;
    }

    .search-toggled{
        border: 1px solid #6b747d ;
    }

</style>