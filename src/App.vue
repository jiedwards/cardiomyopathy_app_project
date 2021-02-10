<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div id="app">
    <Navbar :isLoggedIn="isLoggedIn" :userProfileData="userProfileData"/>
  </div>
  <router-view />
</template>

<script>
import Navbar from "./components/Navbar";
import { firebaseAuth, firebaseDb } from "./utils/firebase";

export default {
  name: "app",
  data() {
    return {
      isLoggedIn: false,
      userProfileData: {}
    }
  },
  mounted() {
        
    firebaseAuth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        firebaseDb.collection("users")
        .doc(currentUser.uid)
        .get()
        .then((user) => {
          this.userProfileData = user.data();
        })
        .catch((err) => alert(err.message));

        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
        this.userProfileData = {};
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
