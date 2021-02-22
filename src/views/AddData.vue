<template>
  <div class="container">
    <div class="card-group col s12 m6 l4 offset-m2 offset-l4">
      <div class="card">
        <div class="card-action red lighten-2 white-text">
          <h3>Add experimental data</h3>
        </div>
        <form @submit.prevent="SubmitNewData">
          <div class="card-content">
            <h5>Gene Data</h5>

            <label for="data_source"
              >Data source for information (e.g. Book name, Academic paper
              name)</label
            >
            <div class="input-field">
              <i class="material-icons prefix">book</i>
              <input
                type="text"
                id="data_source"
                v-model="data_source"
                required
              />
            </div>

            <div class="input-field col-md">
              <p>
                Cardiomyopathy type
                <i class="inline-icon material-icons">favorite_border</i>
              </p>
              <br>
              <select 
                name="cardiomyopathy_type"
                id="cardiomyopathy_type"
                class="form-control"
                @change="onCardiomyopathyTypeDropdownChange"
                required
              >
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
              <br>
              <select
                name="gene"
                id="gene"
                class="form-control"
                @change="onMutatedGeneDropdownChange"
                required
              >
                <option v-for="gene in mutatedGenes" :key="gene" :value="gene">
                  {{ gene }}
                </option>
              </select>
            </div>

            <div class="input-field col-md">
              <p>
                Chart Data Type
                <i class="inline-icon material-icons">show_chart</i>
              </p>
              <br>
              <select
                name="chart_data_type"
                id="chart_data_type"
                class="form-control"
                @change="onChartDataTypeDropdownChange"
                required
              >
                <option
                  v-for="chartDataType in chartDataTypes"
                  :key="chartDataType"
                  :value="chartDataType"
                >
                  {{ chartDataType }}
                </option>
              </select>
            </div>

            <h5>Chart Data</h5>
            <div class="row">
              <div class="input-field col-md">
                <p>
                  Chart Title
                  <i class="inline-icon material-icons">show_chart</i>
                </p>
                <input
                  type="text"
                  id="chart_title"
                  v-model="chart_title"
                  required
                />
              </div>

              <div class="input-field col-md">
                <p>
                  Amount of decimal points for the X axis data
                  <i class="inline-icon material-icons">show_chart</i>
                </p>
                <select
                  name="decimal_point"
                  id="decimal_point"
                  @change="onDecimalOptionChange"
                  class="form-control"
                  required
                >
                  <option value="0">0 Decimal Points</option>
                  <option value="1">1 Decimal Points</option>
                  <option selected value="2">2 Decimal Points</option>
                  <option value="3">3 Decimal Points</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="input-field col-md">
                <p>
                  Label for X axis
                  <i class="inline-icon material-icons">label</i>
                </p>
                <input
                  type="text"
                  id="x_axis_label"
                  v-model="x_axis_label"
                  required
                />
              </div>

              <div class="input-field col-md">
                <p>
                  Amount of ticks to display on X axis
                  <i class="inline-icon material-icons">done</i>
                </p>
                <select
                  name="x_axis_tick_amount"
                  id="x_axis_tick_amount"
                  @change="onXAxisTickAmountChange"
                  class="form-control"
                >
                  <option value="2">2</option>
                  <option selected value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="max">maximum</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="input-field col-md">
                <p>
                  Label for Y axis
                  <i class="inline-icon material-icons">label</i>
                </p>
                <input
                  type="text"
                  id="y_axis_label"
                  v-model="y_axis_label"
                  required
                />
              </div>

              <div class="input-field col-md">
                <p>
                  Amount of ticks to display on Y axis
                  <i class="inline-icon material-icons">done</i>
                </p>
                <select
                  name="y_axis_tick_amount"
                  id="y_axis_tick_amount"
                  @change="onYAxisTickAmountChange"
                  class="form-control"
                >
                  <option value="2">2</option>
                  <option selected value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="max">maximum</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col mx-auto">
                <p>
                  File to upload
                  <i class="inline-icon material-icons">file_upload</i>
                </p>
                <i class="material-icons prefix">file</i>
                <input
                  type="file"
                  id="data_file"
                  @change="OnFileSelected"
                  accept=".csv"
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="form-field mx-auto">
                <button class="btn-large red lighten-2">Submit data</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { firebaseDb, firebaseAuth } from "../utils/firebase";
import {
  cardiomyopathyTypes,
  mutatedGenes,
  chartDataTypes,
} from "../utils/sharedData";
import { ref } from "vue";

export default {
  data() {
    return {
      chart_title: ref(""),
      data_source: ref(""),
      gene: ref(""),
      x_axis_label: ref(""),
      y_axis_label: ref(""),
      x_axis_tick_amount: null,
      y_axis_tick_amount: null,
      decimal_point: ref(""),
      selectedFile: null,
      cardiomyopathy_type: ref(""),
      chart_data_type: ref(""),
      cardiomyopathyTypes,
      mutatedGenes,
      chartDataTypes,
    };
  },
  methods: {
    OnFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    onXAxisTickAmountChange(event) {
      this.x_axis_tick_amount = event.target.value;
    },
    onYAxisTickAmountChange(event) {
      this.y_axis_tick_amount = event.target.value;
    },
    onDecimalOptionChange(event) {
      this.decimal_point = event.target.value;
      console.log(this.decimal_point);
    },
    onChartDataTypeDropdownChange(event) {
      this.chart_data_type = event.target.value;
    },
    onCardiomyopathyTypeDropdownChange(event) {
      this.cardiomyopathy_type = event.target.value;
    },
    onMutatedGeneDropdownChange(event) {
      this.gene = event.target.value;
    },
    SubmitNewData(event) {
      const papa = require("papaparse");
      let x_axis_data = [];
      let y_axis_data = [];

      papa.parse(this.selectedFile, {
        complete: (results) => {
          if (results.data) {
            for (let i = 1; i < results.data.length; i++) {
              x_axis_data.push(
                parseFloat(results.data[i][0]).toFixed(self.decimal_point.value)
              );
              y_axis_data.push(results.data[i][1]);
            }
          }
          this.AddDataToFirebase(event, x_axis_data, y_axis_data);
        },
      });
    },

    AddDataToFirebase(event, x_axis_data, y_axis_data) {
      firebaseDb
        .collection("experimental-data")
        .add({
          user_id: firebaseAuth.currentUser.uid,
          chart_title: self.chart_title.value,
          data_source: self.data_source.value,
          chart_data_type: self.chart_data_type.value,
          cardiomyopathy_type: self.cardiomyopathy_type.value,
          gene: self.gene.value,
          x_axis_label: self.x_axis_label.value,
          y_axis_label: self.y_axis_label.value,
          x_axis_tick_amount: self.x_axis_tick_amount.value,
          y_axis_tick_amount: self.y_axis_tick_amount.value,
          x_axis_data: x_axis_data,
          y_axis_data: y_axis_data,
          date_created: new Date().toDateString(),
        })
        .then(() => {
          alert("Data successfully added! The input form will now be cleared.");
          event.target.reset();
        })
        .catch((error) => {
          alert("Error adding data to db: ", error);
        });
    },
  },
};
</script>

<style>
.inline-icon {
  vertical-align: bottom;
  font-size: 18px !important;
}
</style>