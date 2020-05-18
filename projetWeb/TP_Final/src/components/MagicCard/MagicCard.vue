<template>
    <div class="magic-card">
        <div class="magic-card-image" :id="tooltipId">
            <b-img :src="card.image_uris.small" fluid-grow/>
        </div>
        <b-tooltip :target="tooltipId" placement="right" triggers="hover" boundary="window">
            <div style="text-align: center">
                <img class="tooltip-image" :src="card.image_uris.normal">
            </div>
        </b-tooltip>
        <div class="magic-card-infos">
            <div class="card-name">{{card.name}}</div>
            <div class="card-type">Type : {{card.type_line}}</div>
            <div class="card-set">Set : {{card.set_name}}</div>
            <div style="flex: 1"></div>
            <div class="card-artist">By {{card.artist}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MagicCard",
        props: {
            card: Object
        },
        computed: {
            computedImage: function () {
                return "background-image: url(" + this.card.image_uris.small + ")"
            },
            tooltipId: function () {
                return "image-" + this._uid ;
            },
        }
    }
</script>

<style scoped>

    .magic-card {
        border: 1px solid black;
        background: white ;
        padding: 3px ;
        display: flex;
        flex-direction: row;
    }

    .magic-card-image{
        flex: none ;
        width: 75px ;
        padding: 2px;
        background: black;
    }

    .magic-card-infos{
        margin-left: 2px ;
        display: flex;
        flex-direction: column;
        flex: 1 ;
        overflow: hidden;
    }

    .card-name{
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .card-type{
        font-size: 0.7em;
    }

    .card-artist{
        font-size: 0.6em;
        font-style: italic;
        text-align: right;
    }

    .card-set{
        font-size: 0.6em ;
    }

    .tooltip-image{
        max-width: 180px;
    }

</style>