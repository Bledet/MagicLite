<template>
  <div id="app">
    <header>
      <div id="head">
        <div id="logo"></div>
        <magic-logger class="magic-logger"></magic-logger>
      </div>
    </header>
    <div class="content"></div>
    <user-information class="user-information"></user-information>
  </div>
</template>

<script>
    import MagicLogger from "./components/MagicLogger/MagicLogger";
    import UserInformation from "./components/UserInformation/UserInformation"

    export default {
        name: 'app',
        components: {
            'magic-logger' : MagicLogger,
            'user-information' : UserInformation
        }
    }
</script>

<style>

  #head{
    display: flex;
    flex-direction: row;
    background-color: #2c3e50;
    border: solid;
    border-radius: 4px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #logo{
    flex: 1;
    max-height: 200px;
    background: url("assets/mtg_logo.png");
    background-size: contain;
    background-repeat: no-repeat;
  }

</style>
