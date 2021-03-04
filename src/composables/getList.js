import { ref } from "vue";

function getList() {
    let disease_list = ref([]);
    const error = ref(null);

    async function populateDiseaseList() {
      const base_url = "https://hpo.jax.org";
      const list_url = base_url + "/api/hpo/disease/OMIM:115197";

      try {
        let disease_data = await fetch(list_url);
        console.log(disease_data);
        if (!disease_data.ok) {
          throw Error("Unable to get list of diease data from HPO")
        }
        disease_list.value = await disease_data.json();
        console.log(disease_list.value);
      }
      catch (disease_list_error) {
        error.value = disease_list_error.message;
        console.log(error.value);
      }
    }

    return {disease_list, error, populateDiseaseList};
}


export default getList;