<template>

  <div class="container">
    <br /><br />
    <div class="row">
      <ul class="list-inline">
        <li
          class="list-inline-item"
          v-for="data in experimentalData"
          :key="data.chartOptions"
        >
          <apexchart
            type="line"
            height="350"
            width="500"
            :options="data.chart.chartOptions"
            :series="data.chart.series"
          ></apexchart>
          <br />

          <h6>Extra details</h6>

          <p><strong> Chart Title: </strong>{{ data.docData.chart_title }}</p>
          <p><strong> Data Source: </strong>{{ data.docData.data_source }}</p>
          <p><strong> Chart Data Type: </strong>{{ data.docData.chart_data_type }}</p>
          <p><strong> Gene: </strong>{{ data.docData.gene }}</p>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["experimentalData"],
  setup() {},
};
</script>
