<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center row xs12>
      <v-flex>
        <div class="text-xs-center" v-if="loading">
          <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
        </div>
        <name></name>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Name from "@/components/Name.vue";

export default Vue.extend({
  components: {
    Name
  },
  data() {
    return {
      loading: true
    };
  }
});
</script>
