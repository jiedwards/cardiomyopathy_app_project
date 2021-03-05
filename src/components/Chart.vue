<template>
  <br /><br />
  <div>
    <div v-for="data in experimentalData" :key="data.chartOptions">
      <div class="row">
        <div class="col">
          <apexchart
            type="line"
            height="450"
            width="700"
            :options="data.chart.chartOptions"
            :series="data.chart.series"
          ></apexchart>
        </div>

        <div class="col">
          <h5>Chart details: {{ data.docData.chart_data_type }}</h5>
          <br /><br />
          <p><strong> Gene: </strong>{{ data.docData.gene }}</p>
          <p><strong> Data Source: </strong>{{ data.docData.data_source }}</p>
          <p>
            <strong> Chart Data Type: </strong
            >{{ data.docData.chart_data_type }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["experimentalData"],
  setup() {},
};
</script>

