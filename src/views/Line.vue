<template>
  <h3>All Line Charts</h3>
  <div>
    {{ welcomeMessage }}

    <br /><br />

    <div class="container">
      <div class="row justify-content-center">
        <form @submit.prevent="GetFilteredExperimentalData">
          <div class="input-field col-md">
            <p>
              Cardiomyopathy type
              <i class="inline-icon material-icons">favorite_border</i>
            </p>
            <br />
            <select
              name="cardiomyopathy_type_choice"
              id="cardiomyopathy_type_choice"
              class="form-control"
              @change="OnCardiomyopathyTypeDropdownChange"
              required
            >
              <option></option>
              <option
                v-for="cardiomyopathyType in cardiomyopathyTypes"
                :key="cardiomyopathyType"
                :value="cardiomyopathyType"
              >
                {{ cardiomyopathyType }}
              </option>
            </select>
          </div>

          <div class="input-field col-md">
            <p>
              Mutated Gene
              <i class="inline-icon material-icons">biotech</i>
            </p>
            <br />
            <select
              name="mutated_gene_choice"
              id="mutated_gene_choice"
              class="form-control"
              @change="OnMutatedGeneDropdownChange"
              required
            >
              <option></option>
              <option
                v-for="mutatedGene in mutatedGenes"
                :key="mutatedGene"
                :value="mutatedGene"
              >
                {{ mutatedGene }}
              </option>
            </select>
          </div>

          <div class="row">
            <div class="form-field mx-auto">
              <button class="btn-large red lighten-2">Filter</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <br /><br />
    <line-chart
      :experimentalData="experimentalDataCharts"
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
      experimentalDataCharts: ref([]),
      firebaseApiExperimentalDataCache: ref([]),
      cardiomyopathyTypes: ref(new Set()),
      mutatedGenes: ref(new Set()),
      cardiomyopathy_type_choice: ref(""),
      mutated_gene_choice: ref(""),
    };
  },
  beforeMount() {
    this.GetExperimentalData();
  },
  methods: {
    GetExperimentalData() {
      // Delete local storage cache of API response before calling for updated data.
      localStorage.removeItem("firebaseAPIResponseCache");

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

              this.firebaseApiExperimentalDataCache.push(docData);
            });

            // API response is cached to reduce firestore API calls.
            localStorage.setItem(
              "firebaseAPIResponseCache",
              JSON.stringify(this.firebaseApiExperimentalDataCache)
            );

            this.GenerateCharts(this.firebaseApiExperimentalDataCache);
            // Chart options must be populated after cache is saved in order to reduce API calls.
            this.GetExperimentalDataDropdownOptions();
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    GetFilteredExperimentalData() {
      this.firebaseApiExperimentalDataCache = [];

      var firebaseAPIResponseCache = JSON.parse(
        localStorage.getItem("firebaseAPIResponseCache")
      );

      // No edge case is needed to check the data exists as the dropdown is dynamically updated and only shows what is available
      firebaseAPIResponseCache.forEach((docData) => {
        if (
          docData.gene == this.mutated_gene_choice &&
          docData.cardiomyopathy_type == this.cardiomyopathy_type_choice
        ) {
          this.firebaseApiExperimentalDataCache.push(docData);
        }
      });
      this.GenerateCharts(this.firebaseApiExperimentalDataCache);
    },
    GenerateCharts(firebaseApiExperimentalDataCache) {
      this.experimentalDataCharts = [];

      firebaseApiExperimentalDataCache.forEach((docData) => {
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
          series: this.GetYAxisData(docData),
        };

        this.welcomeMessage = "Welcome to the experimental data chart page.";
        this.experimentalDataCharts.push({ docData, chart });
      });
    },
    GetYAxisData(docData) {
      let resultData = [];
      // Iterate through Y data axis array in firebase and extract data for each line
      for (let y_axis_data_array of docData.y_axis_data) {
        resultData.push({
          name: y_axis_data_array.plot_name,
          data: y_axis_data_array.data,
        });
      }
      return resultData;
    },
    GetExperimentalDataDropdownOptions() {
      this.mutatedGenes.clear();

      var firebaseAPIResponseCache = JSON.parse(
        localStorage.getItem("firebaseAPIResponseCache")
      );

      firebaseAPIResponseCache.forEach((docData) => {
        if (typeof docData.cardiomyopathy_type !== "undefined") {
          this.cardiomyopathyTypes.add(docData.cardiomyopathy_type);
        }

        if (
          typeof docData.gene !== "undefined" &&
          this.cardiomyopathy_type_choice == docData.cardiomyopathy_type
        ) {
          this.mutatedGenes.add(docData.gene);
        }
      });
    },
    OnCardiomyopathyTypeDropdownChange(event) {
      this.cardiomyopathy_type_choice = event.target.value;
      this.GetExperimentalDataDropdownOptions();
    },
    OnMutatedGeneDropdownChange(event) {
      this.mutated_gene_choice = event.target.value;
    },
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
