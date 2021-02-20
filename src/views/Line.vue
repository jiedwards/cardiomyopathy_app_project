<template>
  <h3>All Line Charts</h3>
  <div>
    {{ welcomeMessage }}

    <div class="container">
      <div class="row">
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
            @change="onCardiomyopathyTypeDropdownChange"
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
            @change="onMutatedGeneDropdownChange"
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
      </div>
    </div>

    <br /><br />
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
      cardiomyopathyTypes: ref(new Set()),
      mutatedGenes: ref(new Set()),
      cardiomyopathy_type_choice: ref(""),
      mutated_gene_choice: ref(""),
    };
  },
  beforeMount() {
    this.getExperimentalData();
    this.getExperimentalDataDropdownOptions();
  },
  methods: {
    onCardiomyopathyTypeDropdownChange(event) {
      this.cardiomyopathy_type_choice = event.target.value;
      this.getExperimentalDataDropdownOptions();
    },
    onMutatedGeneDropdownChange(event) {
      this.mutated_gene_choice = event.target.value;
    },
    getExperimentalDataDropdownOptions() {
      this.mutatedGenes.clear();

      firebaseDb
        .collection("experimental-data")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let docData = doc.data();

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

        });
    },
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

              this.welcomeMessage =
                "Welcome to the experimental data chart page.";
              this.experimentalData.push({ docData, chart });
            });
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
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
