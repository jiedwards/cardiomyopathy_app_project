<template>
  <h3>All Line Charts</h3>
  <div>
    <line-chart class="center"></line-chart>
  </div>

  <p> test</p>
</template>

<script>
import LineChart from "@/components/LineChart";

export default {
  components: {
    LineChart,
  },
};
</script>

<style scoped>
.center {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
</style>
