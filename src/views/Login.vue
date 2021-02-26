<template>
  <div class="container">
    <div class="col s12 m6 l4 offset-m2 offset-l4">
      <div class="card">
        <div class="card-action red lighten-2 white-text">
          <h3>Login</h3>
        </div>
        <form @submit.prevent="Login">
          <div class="card-content">
            <label for="email">Email Address</label>
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
            <a href="#" class="pull-right" v-on:click="ForgotPassword"
              >Forgot password</a
            >
            <br />
            <br />
            <div class="form-field">
              <button v-on:click="Login" class="btn-large red lighten-2">
                Login
              </button>
            </div>
            <br />
            <p>
              Not registered?
              <router-link to="/register">Create an account here</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="home">
    <button @click="openModal()">Click Here For Help</button>
    <Modal ref="modal">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
    </Modal>
  </div>
</template>

<script>
import { ref } from "vue";
import { firebaseAuth } from "../utils/firebase";
import Modal from '@/components/Modal.vue'
import Swal from "sweetalert2";

export default {
  name: 'Home',
  components: {
    Modal, 
  },
  methods: {
    openModal(){
      this.$refs.modal.show();
    },
  },
};

export default {
  data() {
    return {
      email: ref(""),
      password: ref(""),
    };
  },
  methods: {
    Login() {
      firebaseAuth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          if (firebaseAuth.currentUser.emailVerified) {
            this.$router.push("/dashboard");
          } else {
            firebaseAuth.currentUser.sendEmailVerification();
            alert(
              "Email address is not verified. An email will be sent to authenticate your account."
            );
            firebaseAuth
              .signOut()
              .then(() => {
                this.$router.push("/login");
              })
              .catch((err) => alert(err.message));
          }
        })
        .catch((err) => alert(err.message));
    },
    ForgotPassword() {
      if (
        confirm(
          `Would you like a password reset email to be sent to: ${this.email} `
        )
      ) {
        firebaseAuth
          .sendPasswordResetEmail(this.email)
          .then(() => {
            Swal.fire(
              "Forgotten password email sent.",
              "A password reset email has been sent to the email address entered above.",
              "success"
            );
          })
          .catch((err) => alert(err.message));
      }
    },
  },
};
</script>