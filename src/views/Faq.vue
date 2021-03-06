<template>
  <div class="faq">
    <h1>This is the FAQs page</h1>
    <div class="container">
      <h5 type="button" v-on:click="toggletext()">
        •How do I setup an account?
      </h5>
      <p v-show="isHidden">
        • Simply go to the homepage and click the ‘Register’ button and all you
        should do is fill in the input fields to set up your account.
      </p>

      <h5 type="button" v-on:click="toggletext()">
        • How do I reset my password?
      </h5>
      <p v-show="isHidden">
        • To reset your password, you can click on the ‘Login’ button and click
        the ‘Forgot password’ to send a password reset to your email.
      </p>

      <h5 type="button" v-on:click="toggletext()">
        • What is the purpose of this website?
      </h5>
      <p v-show="isHidden">
        • The purpose of this website is for users to store data about
        cardiomyopathy types for either educational or research purposes etc.
        This is the most effective way as data can be changed, added, or deleted
        at any time.
      </p>
      <h5 type="button" v-on:click="toggletext()">• How do I view data?</h5>
      <p v-show="isHidden">
        • To view data when you are logged in you can click on the navigation
        bar at the top and click on the ‘Experimental data’ and you can scroll
        down and view the data.
      </p>
      <h5 type="button" v-on:click="toggletext()">
        • How do I add experimental data?
      </h5>
      <p v-show="isHidden">
        • To add experimental data, you must be logged in. Then you would need
        to click on your account name on the top right and click on ‘My
        dashboard’ and you have the option to add data into the input fields and
        upload files.
      </p>
      <h5 type="button" v-on:click="toggletext()">
        • How do I delete experimental data?
      </h5>
      <p v-show="isHidden">
        • To delete data, you must be logged in. Then you would need to click on
        your account name on the top right of the navigation bar and click on
        the ‘My dashboard’. Then you will see the option to delete the data from
        the database by clicking on the ‘X’ button next to the data. You can
        only delete the data you have created.
      </p>
      <h5 type="button" v-on:click="toggletext()">
        • Is there a specified data format for new data?
      </h5>
      <p v-show="isHidden">
        • The data should be stored in a file CSV file, which is uploaded at the
        end of the "add-data" form. The CSV file should contain a maximum of 3
        columns. See attached image/file for an example.
      </p>
      <h5 type="button" v-on:click="toggletext()">
        • How to filter through experimental data by gene/cardiomyopathy type?
      </h5>
      <p v-show="isHidden">
        • There are dropdown options on the experimental data page. It contains
        two options. The first is the Cardiomyopathy type once this is selected
        the second drop down which contains the mutated gene type. Selecting
        both will filter the data.
      </p>
      <h5 type="button" v-on:click="toggletext()">
        • How can I get help if I am confused whilst using the website?
      </h5>
      <p v-show="isHidden">
        • There are usually ‘?’ buttons located around every page to click on if
        the information is not clear enough.
      </p>
      <h5 type="button" v-on:click="toggletext()">
        • Do you have any accessibility features?
      </h5>
      <p v-show="isHidden">
        • Yes, currently the website includes text that is big enough for all
        users to read without any difficulties. The website can also fit into
        different devices too that is also readable.
      </p>
      <h5 type="button" v-on:click="toggletext()">
        • Do you have any accessibility features?
      </h5>
      <p v-show="isHidden">
        • Yes, currently the website includes text that is big enough for all
        users to read without any difficulties. The website can also fit into
        different devices too that is also readable.
      </p>
      <h5 type="button" v-on:click="toggletext()">
        • Where do you obtain the additional data displayed on the graphs?
      </h5>
      <p v-show="isHidden">
        The additional information is sourced from the https://hpo.jax.org/app/
        API, which is a project that provides an ontology of medically relevant
        phenotypes, disease-phenotype annotations, and the algorithms that
        operate on these.
      </p>
      <h5 type="button" v-on:click="toggletext()">
        • Where is my data stored?
      </h5>
      <p v-show="isHidden">
        • The data is stored in firebase and any information will be safe and
        will not be sold, shared or rented to 3rd partied companies.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  el: "#about",
  data() {
    return {
      isHidden: false,
    };
  },
  methods: {
    toggletext: function () {
      this.isHidden = !this.isHidden;
    },
  },
};
</script>