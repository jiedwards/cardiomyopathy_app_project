<template>
  <div class="homepage">
    <h3>Welcome to your members area.</h3>

    <div>
      <router-link class="btn-large red lighten-2 btn-large" to="/add-data"
        >Add data<i class="material-icons right">show_chart</i></router-link
      >
    </div>
    <br />

    <div>
      <router-link class="btn-large red lighten-2 btn-large" to="/delete-data"
        >Delete data<i class="material-icons right">show_chart</i></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>