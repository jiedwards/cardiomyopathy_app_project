<template>
  <h3>All Line Charts</h3>
  <div>
    {{ welcomeMessage }}
    <br><br>
    <line-chart
      :experimentalData="experimentalData"
      class="center"
    ></line-chart>
  </div>

</template>

<script>
import LineChart from "@/components/LineChart";
import { ref } from "vue";
import { firebaseDb } from "../utils/firebase";

export default {
  data() {
    return {
      welcomeMessage: ref(""),
      experimentalData: ref([]),
    };
  },
  beforeMount(){
    this.getExperimentalData()
 },
  methods: {
    getExperimentalData() {

      firebaseDb
      .collection("experimental-data")
      .get()
      .then((querySnapshot) => {
        //Edge case for when no experimental data exists.
        if (querySnapshot.docs.length == 0) {
          this.welcomeMessage = "No data provided";
        } else {
          querySnapshot.forEach((doc) => {
            let docData = doc.data();
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

            this.welcomeMessage = "Welcome to the experimental data chart page.";
            this.experimentalData.push({ docData, chart });
          });
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    }

  },
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
