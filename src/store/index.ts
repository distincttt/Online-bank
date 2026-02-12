import { createStore, createLogger } from "vuex";
import { ActionTree, MutationTree } from "vuex/types/index.js";

import authModule from "./modules/auth.module";
import requestModule from "./modules/request.module";
import { Message, RootState } from "@/types/store";

const plugins = [];

if (process.env.NODE_ENV === "development") {
   plugins.push(createLogger());
}

export const mutations: MutationTree<RootState> = {
   setMessage(state, message: Message) {
      state.message = message;
   },
   clearMessage(state) {
      state.message = null;
   },
   openSidebar(state) {
      state.sidebar = true;
   },
   closeSidebar(state) {
      state.sidebar = false;
   },
};

export const actions: ActionTree<RootState, RootState> = {
   setMessage({ commit }, message: Message) {
      commit("setMessage", message);
      setTimeout(() => {
         commit("clearMessage");
      }, 5000);
   },
};

export default createStore({
   plugins,
   state() {
      return { message: null, sidebar: false };
   },
   mutations,
   actions,

   modules: {
      authModule,
      requestModule,
   },
});
