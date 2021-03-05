<template>
  <div class="container-fluid">
    <div class="justify-content-center">
      <h3>
        All Line Charts
        <a @click="openModal()" class="btn-floating btn-sm grey float-right">
          <i class="material-icons">help_outline</i>
        </a>
      </h3>
    </div>
    {{ welcomeMessage }}

    <div id="filterDropdown" class="container">
      <h5>Data filters</h5>
      <h7>Filter to get more information on disease/gene</h7>
      <div class="row justify-content-center">
        <form @submit.prevent="GetFilteredExperimentalData">
          <div class="input-field col-md">
            <p>
              Cardiomyopathy type
              <i class="inline-icon material-icons">favorite_border</i>
            </p>
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

    <div class="row d-flex justify-content-center">
      <div v-if="!isHidden" class="col-4">
        <hpo-api-data :diseaseData="diseaseData" class="center"></hpo-api-data>
      </div>
      <div class="col-8">
        <chart
          :experimentalData="experimentalDataCharts"
          class="center"
        ></chart>
      </div>
    </div>

    <Modal ref="modal" />
  </div>
</template>

<script>
import Chart from "@/components/Chart";
import HpoApiData from "@/components/HpoApiData";
import { ref } from "vue";
import { firebaseDb } from "../utils/firebase";
import {
  GenerateCharts,
  ApiGeneDataRequest,
} from "../utils/sharedFunctionality";
import Modal from "@/components/Modal.vue";

export default {
  data() {
    return {
      welcomeMessage: ref(""),
      diseaseData: [],
      error: ref(null),
      experimentalDataCharts: ref([]),
      ExperimentalDataApiCache: ref([]),
      cardiomyopathyTypes: ref(new Set()),
      mutatedGenes: ref(new Set()),
      cardiomyopathy_type_choice: ref(""),
      mutated_gene_choice: ref(""),
      isHidden: true,
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

            this.experimentalDataCharts = GenerateCharts(
              this.ExperimentalDataApiCache
            );
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
      this.experimentalDataCharts = GenerateCharts(
        this.ExperimentalDataApiCache
      );

      let api_disease_id = this.ExperimentalDataApiCache[0].api_disease_id;
      this.GetGeneData(api_disease_id);
      this.isHidden = !this.isHidden;
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
    async GetGeneData(api_disease_id) {
      this.diseaseData = await ApiGeneDataRequest(api_disease_id);
    },
    openModal() {
      this.$refs.modal.show();
    },
    OnCardiomyopathyTypeDropdownChange(event) {
      this.cardiomyopathy_type_choice = event.target.value;
      this.GetExperimentalDataDropdownOptions();
    },
    OnMutatedGeneDropdownChange(event) {
      this.mutated_gene_choice = event.target.value;
      this.isHidden = true;
    },
  },
  components: {
    Chart,
    Modal,
    HpoApiData,
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