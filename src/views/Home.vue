<template>
  <div class="home container">
    <h2>Cardiomyopathy Database</h2>
    <i class="material-icons">favorite</i>
    <br /><br />
    <p>
      Cardiomyopathy (kahr-dee-o-my-OP-uh-thee) is a disease of the heart muscle
      that makes it harder for your heart to pump blood to the rest of your
      body. Cardiomyopathy can lead to heart failure.
    </p>
    <p>
      The main types of cardiomyopathy include dilated, hypertrophic and
      restrictive cardiomyopathy. Treatment — which might include medications,
      surgically implanted devices or, in severe cases, a heart transplant —
      depends on which type of cardiomyopathy you have and how serious it is.
    </p>
    <p>
      This website allows users to store and view data about cardiomyopathy
      types for either educational or research purposes etc.
    </p>

    <strong><p>Login or register below to view, add or delete data.</p></strong>
    <router-link class="btn-large green lighten-2 mb-2" to="/login"
      >Login</router-link
    >
    <hr />
    <router-link class="btn-large red lighten-2" to="/register"
      >Register</router-link
    >
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>

<style>
p {
  font-size: 18px;
}
</style>

