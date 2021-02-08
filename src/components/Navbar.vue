<template>
  <nav>
    <div class="nav-wrapper #ff1100">
      <div class="container">
        <ul class="left">
          <router-link to="/">Cardiomyopathy</router-link>
        </ul>
        <ul class="right">
          <li><router-link to="/">Homepage</router-link></li>
          <li v-if="isLoggedIn">
            <router-link to="/dashboard">My Dashboard</router-link>
          </li>
          <button v-if="isLoggedIn" class="btn black" @click="Logout">
            Logout
          </button>
          <li v-if="!isLoggedIn">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link to="/register">Register</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from "../utils/firebase";

export default {
  name: "navbar",
  props: ["isLoggedIn"],
  methods: {
    Logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/');
        })
        .catch((err) => alert(err.message));
    },
  }
};
</script>