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


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import API from "@/API";
import { Stream } from "xstream";

export default Vue.extend({
  data() {
    const self = {
      waiting: 1,
      listener: {
        next(t: { type: string; value: number }) {
          console.log(t);
          self.waiting = t["value"];
        }
      }
    };

    return self;
  },
  created() {
    let observable = (API.getObservable() as any) as Stream<{
      type: string;
      value: number;
    }>;

    observable
      .filter((t: { type: string; value: number }) => t["type"] == "number")
      .addListener(this.listener);
  },
  beforeRouteLeave(to, from, next) {
    console.log("removing");
    let observable = API.getObservable() as any;

    (observable as Stream<{
      type: string;
      value: number;
    }>).removeListener(this.listener);

    next();
  }
});
</script>
