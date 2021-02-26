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
import {
  GenerateCharts
} from "../utils/sharedFunctionality";

export default {
  data() {
    return {
      welcomeMessage: ref(""),
      experimentalDataCharts: ref([]),
      ExperimentalDataApiCache: ref([]),
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
              this.ExperimentalDataApiCache.push(docData);
              // Edge case for when user wants to display total amount of ticks
              if (docData.x_axis_tick_amount == "max") {
                docData.x_axis_tick_amount = docData.x_axis_data.length;
              }
            });

            // API response is cached to reduce firestore API calls.
            localStorage.setItem(
              "firebaseAPIResponseCache",
              JSON.stringify(this.ExperimentalDataApiCache)
            );

            this.experimentalDataCharts = GenerateCharts(this.ExperimentalDataApiCache);
            // Chart options must be populated after cache is saved in order to reduce API calls.
            this.GetExperimentalDataDropdownOptions();
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    GetFilteredExperimentalData() {
      // Firebase API data cache must be reset, it currently contains all of the graphs.
      this.ExperimentalDataApiCache = [];

      var firebaseAPIResponseCache = JSON.parse(
        localStorage.getItem("firebaseAPIResponseCache")
      );

      // No edge case is needed to check the data exists as the dropdown is dynamically updated and only shows what is available
      firebaseAPIResponseCache.forEach((docData) => {
        if (
          docData.gene == this.mutated_gene_choice &&
          docData.cardiomyopathy_type == this.cardiomyopathy_type_choice
        ) {
          this.ExperimentalDataApiCache.push(docData);
        }
      });
      this.experimentalDataCharts = GenerateCharts(this.ExperimentalDataApiCache);
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
