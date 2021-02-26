<template>
  <nav>
    <div class="nav-wrapper #ff1100">
      <div class="container-fluid">
        <ul class="left">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/faq">FAQs</router-link></li>
          <li v-if="isLoggedIn"><router-link to="/line-chart">Experimental data<i class="material-icons right">show_chart</i></router-link></li>
        </ul>

        <!-- Dropdown menu for when user is logged in -->
        <ul class="right">
          <div class="dropdown" v-if="isLoggedIn">
            <a
              class="dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ userProfileData.name }}
              <i class="material-icons left">person</i>
            </a>
            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownMenuButton"
            >
              <a class="dropdown-item"
                ><router-link class="black-text" to="/dashboard"
                  >My dashboard</router-link
                ></a
              >
              <a class="dropdown-item text-center" @click="Logout">Logout</a>
            </div>
          </div>

          <!-- When user is not logged in -->
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
import { firebaseAuth } from "../utils/firebase";

export default {
  name: "navbar",
  props: ["isLoggedIn", "userProfileData"],
  methods: {
    Logout: function () {
      firebaseAuth
        .signOut()
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => alert(err.message));
    },
  },
};
</script>