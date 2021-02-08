<template>
  <div class="homepage">
    <h1>Welcome, {{ name }}</h1>
    <router-link to="/about">About</router-link>
    <br />
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import firebase from '../utils/firebase';

export default {
  setup() {
    const name = ref("");

    onBeforeMount(() => {
      const user = firebase.auth().currentUser;
      
      if (user) {
        name.value = user.email.split('@')[0];
      }
    });

    return { name }
  }
}
</script>