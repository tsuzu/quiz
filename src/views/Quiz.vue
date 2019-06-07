<template>
  <v-container fill-height>
    <v-layout justify-start column wrap>
      <v-flex row xs6>
        <h1 class="display-2 font-weight-bold mb-3">Q{{index}}</h1>
        <div class="title text">{{statement}}</div>
      </v-flex>
      <v-flex v-if="selectVisible" xs6>
        <v-layout justify-space-around column wrap>
          <v-flex v-for="(v, id) in select[selectIndex]" v-bind:key="id" @click="click(id)">
            <v-btn block>{{v}}</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-layout v-if="answered" justify-space-around column wrap>
        <v-flex>
          <v-btn block disabled>解答済み</v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>


<script >
import { Component, Vue } from "vue-property-decorator";
import API from "@/API";
import store from "../store";

export default Vue.extend({
  data() {
    return {
      index: 1,
      statement: "",
      statementRaw: "",
      selectIndex: 0,
      selectVisible: false,
      select: [],
      answer: "",
      answered: false,

      listener: {
        next: t => {
          this.start(t["select"], t["statement"]);
        }
      }
    };
  },
  mounted() {
    store.commit("setProgress", 0);
    this.index = parseInt(this.$route.params.id);
    // this.start(
    //   [["あ", "い", "う"], ["え", "お", "か"]],
    //   "このサークルの正式名称はどれでしょう。"
    // );

    let observable = API.getObservable();

    observable.filter(t => t["type"] == "quiz").addListener(this.listener);
  },
  beforeRouteLeave(to, from, next) {
    store.commit("setProgress", 0);
    console.log("removing");
    let observable = API.getObservable();

    observable.removeListener(this.listener);

    next();
  },
  methods: {
    start(select, statement) {
      this.select = select;
      this.statementRaw = statement;
      this.selectIndex = 0;

      {
        let writed = 0;
        let interval = setInterval(() => {
          if (statement.length > writed) {
            this.statement += statement.charAt(writed);
            ++writed;
          } else {
            clearInterval(interval);
          }
        }, 100);
      }
      {
        var start = new Date().getTime();
        let interval = setInterval(() => {
          var current = new Date().getTime();

          const progress = ((current - start) / 1000 / 10) * 100;

          store.commit("setProgress", progress);
          if (progress >= 100) {
            clearInterval(interval);
            store.commit("setProgress", 0);
          }
        }, 50);
      }
      this.selectVisible = true;
      this.answered = false;
    },
    click(index) {
      this.answer += this.select[this.selectIndex][index];
      ++this.selectIndex;
      if (this.selectIndex == this.select.length) {
        console.log("answered");
        this.selectVisible = false;
        API.answer(this.index, this.answer);
        this.answered = true;
      }
    }
  }
});
</script>

<style>
.text {
  display: inline-block;
}
</style>
