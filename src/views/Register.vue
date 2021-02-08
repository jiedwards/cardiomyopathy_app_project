<template>
  <div class="container">
    <div class="col s12 m6 l4 offset-m2 offset-l4">
      <div class="card">
        <div class="card-action red lighten-2 white-text">
          <h3>Register</h3>
        </div>
        <form @submit.prevent="Register">
          <div class="card-content">
            <label for="email">Email Address (This will be your username)</label>
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input type="email" id="email" v-model="email" />
            </div>
            <br />
            <label for="password">Password</label>
            <div class="input-field">
              <i class="material-icons prefix">lock</i>
              <input type="password" id="password" v-model="password" />
            </div>
            <br />

            <label for="email">Name</label>
            <div class="input-field">
              <i class="material-icons prefix">person</i>
              <input type="text" id="name" v-model="name" required/>
            </div>
            <br />

            <label for="institution">Institution</label>
            <div class="input-field">
              <i class="material-icons prefix">school</i>
              <input type="text" id="institution" v-model="institution" required/>
            </div>
            <br />

            <div class="form-field">
              <button v-on:click="register" class="btn-large red lighten-2">
                Register
              </button>
            </div>
            <br />

            <p>
              Already have an account?
              <router-link to="/login">Login here</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "../utils/firebase";
const db = firebase.firestore();

export default {
  data() {
    return {
      email: ref(""),
      password: ref(""),
      name: ref(""),
      institution: ref("")
    };
  },
  methods: {
    Register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          db.collection("users")
            .add({
              user_id : data.user.uid,
              email : this.email,
              name : this.name,
              institution : this.institution,
              date_created : new Date(),
              date_modified : new Date()
            })
            .then(() => {
              this.$router.push('/dashboard');
            })
            .catch((err) => alert(err.message));
        })
        .catch((err) => alert(err.message));
    },
  },
};
</script>

