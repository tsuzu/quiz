<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex xs5>
        <v-layout justify-start column wrap>
          <v-flex row xs6>
            <h1 class="display-2 font-weight-bold mb-3">Q{{index}} ({{players}}人が挑戦中)</h1>
            <div class="title font-weight-bold">{{statement}}</div>
          </v-flex>
          <v-flex xs6 mt-5>
            <h1 class="display-1 font-weight-bold mb-3" v-if="answer.length != 0">解答</h1>
            <h1 class="title font-weight-bold mb-3" v-if="answer.length != 0">{{answer}}</h1>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs7>
        <v-layout justify-start column wrap>
          <v-flex row xs12>
            <h1 class="display-2 text-xs-start font-weight-bold mb-3">ランキング</h1>
            <div
              v-for="(user, index) in ranking"
              v-bind:key="user.name"
              class="text-xs-start"
              v-bind:class="{ 'display-3': index==0, 'display-2': index==1, 'display-1': index>=2 && index<=4, 'headline': index >= 5 && index<9, 'title': index>=9 }"
            >{{index+1}}: {{user.name}}({{user.points}}pts, {{user.solved}} solved)</div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
import API from "@/API";

export default Vue.extend({
  data() {
    return {
      ranking: [],
      index: 1,
      players: 0,
      statement: "",
      answer: ""
    };
  },
  async mounted() {
    await API.connectAsViewer();

    let obs = API.getObservable();

    obs
      .filter(t => t["type"] == "answer")
      .subscribe({
        next: t => {
          this.answer = t["answer"];
        }
      });
    obs
      .filter(t => t["type"] == "quiz")
      .subscribe({
        next: t => {
          this.index = t["index"];
          let writed = 0;
          this.statement = "";
          const statement = t["statement"];
          let interval = setInterval(() => {
            if (statement.length > writed) {
              this.statement += statement.charAt(writed);
              ++writed;
            } else {
              clearInterval(interval);
            }
          }, 100);
          this.answer = "";
        }
      });
    obs
      .filter(t => t["type"] == "ranking")
      .subscribe({
        next: t => {
          this.ranking = t["ranking"];
        }
      });
    obs
      .filter(t => t["type"] == "number")
      .subscribe({
        next: t => {
          this.players = t["value"];
        }
      });
  }
});
</script>

