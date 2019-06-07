<template>
  <v-app>
    <v-toolbar color="blue darken-4" app overflow clipped-left fixed extended :extension-height="4">
      <v-toolbar-title class="white--text">MIS.W Quiz</v-toolbar-title>
      <v-progress-linear
        slot="extension"
        v-model="progress"
        class="ma-0"
        color="red accent-1"
        :height="4"
        style="padding: 0px"
      ></v-progress-linear>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import store from "./store";

export default Vue.extend({
  name: "App",
  data() {
    return {
      //
    };
  },
  computed: {
    progress() {
      return store.state.progress;
    }
  }
});
</script>

<style>
.v-toolbar__extension {
  padding: 0px !important;
}
</style>
