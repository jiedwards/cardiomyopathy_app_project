<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div id="app">
    <Navbar :isLoggedIn="isLoggedIn"/>
  </div>
  <router-view />
</template>

<script>
import Navbar from "./components/Navbar";
import firebase from "./utils/firebase";

export default {
  name: "app",
  data() {
    return {
      isLoggedIn: false,
      userAuth: {}
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.userAuth = user;
      } else {
        this.isLoggedIn = false;
        this.userAuth = {};
      }
    });
  },
  components: {
    Navbar
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
