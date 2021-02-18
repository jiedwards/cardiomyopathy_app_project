<template>
  <h3>Delete Data</h3>

  <div class="container">
    {{ welcomeMessage }}
    <table style="width: 100%">
      <tr>
        <th>User ID</th>
        <th>Title</th>
        <th>Data</th>
        <th>Gene</th>
        <th>Date</th>
        <th>Delete</th>
      </tr>

      <tr v-for="chart in chartList" :key="chart.chartOptions">
        <td>
          {{ chart[1].user_id }}
        </td>
        <td>
          {{ chart[1].chart_title }}
        </td>
        <td>
          {{ chart[1].data_source }}
        </td>
        <td>
          {{ chart[1].gene }}
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

export default {
  mounted: function () {
    this.$nextTick(this.GetAllUserCharts);
  },
  setup() {
    let chartList = ref([]);
    let welcomeMessage = ref("");

    function GetAllUserCharts() {
      firebaseDb
        .collection("experimental-data")
        .where("user_id", "==", firebaseAuth.currentUser.uid)
        .get()
        .then((querySnapshot) => {
          //Edge case for when no experimental data exists.
          if (querySnapshot.docs.length == 0) {
            welcomeMessage.value = "You have no experimental data";
          } else {
            querySnapshot.forEach((doc) => {
              let docData = doc.data();

              // Edge case for when user wants to display total amount of ticks
              if (docData.x_axis_tick_amount == "max") {
                docData.x_axis_tick_amount = docData.x_axis_data.length;
              }

              this.chartList.push([doc.id, docData]);
              welcomeMessage.value = "Here is your experimental data:";
            });
          }
        })
        .catch((error) => {
          alert("Error getting documents: ", error);
        });
    }

    function DeleteData(chartDocumentId) {
      if (
        confirm(`Are you sure you would like to delete this experimental data?`)
      ) {
        firebaseDb
          .collection("experimental-data")
          .doc(chartDocumentId)
          .delete()
          .then(() => {
            alert("Data successfully deleted!");
            this.GetAllUserCharts();
          })
          .catch((error) => {
            alert("Error deleting data from db: ", error);
          });
      }
    }

    return { welcomeMessage, chartList, GetAllUserCharts, DeleteData };
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
