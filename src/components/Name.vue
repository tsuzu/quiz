<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">What's your name?</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="Name"
                  required
                  v-model="name"
                  :error-messages="message"
                  @input="input()"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="connect()">Connect</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Vue from "vue";
import API from "@/API";
import router from "@/router";
import store from "@/store";

export default {
  data() {
    return {
      dialog: true,
      name: "",
      message: ""
    };
  },
  props: {},
  methods: {
    async connect() {
      this.dialog = false;
      await API.connect(this.name);

      let obs = API.getObservable();

      obs
        .filter(t => t["type"] == "move")
        .addListener({
          next: t => {
            console.log(t);
            this.$router.push(t["page"]);
          }
        });
      obs
        .filter(t => t["type"] == "ranking")
        .addListener({
          next: t => {
            console.log(t);
            store.commit("set", t["ranking"]);
          }
        });

      router.push("/waiting");
    },
    input() {
      if (this.name.length == 0) {
        this.message = "名前は1文字以上です。";
      } else {
        this.message = "";
      }
    }
  }
};
</script>
