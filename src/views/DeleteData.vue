<template>
  <h3>Delete Data</h3>

  <div class="container">
    {{ welcomeMessage }}
    <table style="width: 100%">
      <tr>
        <th>Cardiomyopathy Type</th>
        <th>Gene</th>
        <th>Data Type</th>
        <th>Data Source</th>
        <th>Date Added</th>
        <th>Delete</th>
      </tr>

      <tr v-for="chart in chartList" :key="chart.chartOptions">
        <td>
          {{ chart[1].cardiomyopathy_type }}
        </td>
        <td>
          {{ chart[1].gene }}
        </td>
        <td>
          {{ chart[1].chart_title }}
        </td>
        <td>
          {{ chart[1].data_source }}
        </td>
        
        <td>
          {{ chart[1].date_created }}
        </td>
        <td>
          <div class="form-field mx-auto">
            <button
              v-on:click="DeleteData(chart[0])"
              class="btn-large red lighten-2"
            >
              X
            </button>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ref } from "vue";
import { firebaseDb, firebaseAuth } from "../utils/firebase";
import Swal from "sweetalert2";

export default {
  mounted: function () {
    this.$nextTick(this.GetAllUserCharts);
  },
  data() {
    return {
      chartList: ref([]),
      welcomeMessage: ref(""),
    };
  },
  methods: {
    GetAllUserCharts() {
      this.chartList = [];
      firebaseDb
        .collection("experimental-data")
        .where("user_id", "==", firebaseAuth.currentUser.uid)
        .get()
        .then((querySnapshot) => {
          //Edge case for when no experimental data exists.
          if (querySnapshot.docs.length == 0) {
            this.welcomeMessage = "You have no experimental data";
          } else {
            querySnapshot.forEach((doc) => {
              let docData = doc.data();

              // Edge case for when user wants to display total amount of ticks
              if (docData.x_axis_tick_amount == "max") {
                docData.x_axis_tick_amount = docData.x_axis_data.length;
              }

              this.chartList.push([doc.id, docData]);
              this.welcomeMessage = "Here is your experimental data:";
            });
          }
        })
        .catch((error) => {
          alert("Error getting documents: ", error);
        });
    },
    DeleteData(chartDocumentId) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          firebaseDb
            .collection("experimental-data")
            .doc(chartDocumentId)
            .delete()
            .then(() => {
              Swal.fire("Deleted!", "Data successfully deleted!", "success");
              this.GetAllUserCharts();
            })
            .catch((error) => {
              alert("Error deleting data from db: ", error);
            });
        }
      });
    }
  }
};
</script>

<style scoped>
.center {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
</style>
