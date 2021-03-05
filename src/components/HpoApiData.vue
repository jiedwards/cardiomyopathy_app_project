<template>
  <br /><br />
  <div>
    <h4>Disease and Gene Information</h4>
    <div v-if="diseaseData.error">Error Message: {{ diseaseData.message }}</div>
    <div v-else>
      <div id="accordion">
        <div
          :span="8"
          v-for="disease in diseaseData.catTermsMap"
          :key="disease.catLabel"
          :offset="index > 0 ? 2 : 0"
        >
          <div v-if="disease.catLabel == 'Cardiovascular'">
            <div>
              <h6>Disease Name: {{ diseaseData.disease.diseaseName }}</h6>
              <h6>Type: {{ disease.catLabel }}</h6>
              <hr />
              <h5>Cardiovascular Clinical Synopsis</h5>
              <br />
            </div>

            <div
              :span="8"
              v-for="(terms, index) in disease.terms"
              :key="terms.ontologyId"
              :offset="index > 0 ? 2 : 0"
            >
              <div class="card">
                <div class="card-header" :id="`heading${index}`">
                  <button
                    class="btn btn-link collapsed grey lighten-1"
                    data-toggle="collapse"
                    :data-target="`#collapse${index}`"
                    aria-expanded="true"
                    :aria-controls="`#collapse${index}`"
                  >
                    {{ terms.name }}
                  </button>
                </div>

                <div
                  :id="`collapse${index}`"
                  class="collapse show"
                  :aria-labelledby="`heading${index}`"
                  data-parent="#accordion"
                >
                  <div class="card-body">
                    {{ terms.definition }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["diseaseData"],
  setup() {},
};
</script>

