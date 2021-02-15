<template>
    <h6>{{ welcomeMessage }}</h6>

  <div class="container">
    <br><br>
    <div class="row">
    <ul class="list-inline">
      <li class="list-inline-item" v-for="chart in chartList" :key="chart.chartOptions">
        <apexchart
          type="line"
          height="350"
          width="500"
          :options="chart.chartOptions"
          :series="chart.series"
        ></apexchart>
        <br />
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { firebaseDb } from "../utils/firebase";

export default {
  setup() {
    let welcomeMessage = ref("");
    let chartList = [];

    firebaseDb
      .collection("experimental-data")
      .get()
      .then((querySnapshot) => {
        //Edge case for when no experimental data exists.
        if (querySnapshot.docs.length == 0) {
          welcomeMessage.value = "No data provided";
        } else {
          querySnapshot.forEach((doc) => {
            let docData = doc.data();

            console.log(doc.id, " => ", doc.data());

            // Edge case for when user wants to display total amount of ticks
            if (docData.x_axis_tick_amount == "max") {
              docData.x_axis_tick_amount = docData.x_axis_data.length;
            }

            let chart = {
              chartOptions: {
                chart: {
                  height: 350,
                  type: "line",
                  zoom: {
                    enabled: false,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  width: [5, 7, 5],
                  curve: "straight",
                  dashArray: [0, 8, 5],
                },
                title: {
                  text: docData.chart_title,
                  align: "left",
                },
                grid: {
                  row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5,
                  },
                },
                xaxis: {
                  categories: docData.x_axis_data,
                  tickAmount: docData.x_axis_tick_amount - 1,
                  title: {
                    text: docData.x_axis_label,
                  },
                },
                yaxis: {
                  title: {
                    text: docData.y_axis_label,
                  },
                },
                legend: {
                  position: "top",
                  horizontalAlign: "right",
                  floating: true,
                  offsetY: -25,
                  offsetX: -5,
                },
              },
              series: [
                {
                  name: docData.gene,
                  data: docData.y_axis_data,
                },
                //   {
                //     name: "Laptops",
                //     data: [20, 61, 75, 71, 69, 72, 89, 111, 168],
                //   },
              ],
            };

            welcomeMessage.value = "Welcome to the experimental data chart page.";
            chartList.push(chart);

            console.log(chartList);
          });
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    return { chartList, welcomeMessage };
  },
};
</script>
