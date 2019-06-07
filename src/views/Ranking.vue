<template>
  <v-container fill-height>
    <v-layout justify-center column wrap>
      <v-flex row xs12>
        <h1 class="display-2 text-xs-center font-weight-bold mb-3">ランキング</h1>
        <div
          v-for="(user, index) in getRanking"
          v-bind:key="user.name"
          class="text-xs-center"
          v-bind:class="{ 'display-3': index==0, 'display-2': index==1, 'display-1': index>=2 && index<=4, 'headline': index >= 5 && index<9, 'title': index>=9 }"
        >{{index+1}}: {{user.name}}({{user.points}})</div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Store from "@/store";
import store from "@/store";

export default {
  computed: {
    getRanking() {
      return store.state.ranking;
    }
  }
};
</script>
