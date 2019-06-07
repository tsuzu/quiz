import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

type RankingType = {
  name: string;
  id: string;
  points: number;
};

export default new Vuex.Store({
  state: {
    ranking: new Array<RankingType>(),
    progress: 0,
  },
  mutations: {
    "set": (state, r) => {
      state.ranking = r;
    },
    "setProgress": (state, p) => {
      state.progress = p;
    }
  },
  actions: {

  },
});
