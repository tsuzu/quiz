<template>
  <v-container fluid>
    <v-layout justify-center column wrap>
      <v-flex>
        <h1 class="display-2 text-xs-center font-weight-bold mb-3">ゲームの開始を待機しています</h1>
      </v-flex>
      <v-flex>
        <div class="display-2 text-xs-center">{{waiting}}人が待機中</div>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { Component, Vue } from "vue-property-decorator";
import API from "@/API";

export default Vue.extend({
  data() {
    return {
      waiting: 1,
      listener: {
        next: t => {
          console.log(t);
          this.waiting = t["value"];
        }
      }
    };
  },
  created() {
    let observable = API.getObservable();

    observable.filter(t => t["type"] == "number").addListener(this.listener);
  },
  beforeRouteLeave(to, from, next) {
    console.log("removing");
    let observable = API.getObservable();

    observable.removeListener(this.listener);

    next();
  }
});
</script>
