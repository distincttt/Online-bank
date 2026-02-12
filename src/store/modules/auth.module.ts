import axios, { AxiosError } from "axios";
import { Module } from "vuex/types/index.js";

import { error } from "../../utils/error";
import type { RootState } from "@/types/store";
import type { AuthState, AuthUser, FirebaseAuthResponse } from "@/types/auth";

const TOKEN_KEY = "jwt-token";

const authModule: Module<AuthState, RootState> = {
   namespaced: true,

   state: (): AuthState => ({
      token: localStorage.getItem(TOKEN_KEY),
   }),

   getters: {
      token: (state): string | null => state.token,
      isAuthenticated: (state): boolean => !!state.token,
   },

   mutations: {
      setToken(state, token: string) {
         state.token = token;
         localStorage.setItem(TOKEN_KEY, token);
      },
      logout(state) {
         state.token = null;
         localStorage.removeItem(TOKEN_KEY);
      },
   },

   actions: {
      async registration({ commit, dispatch }, user: AuthUser) {
         try {
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`;

            const { data } = await axios.post<FirebaseAuthResponse>(url, {
               ...user,
               returnSecureToken: true,
            });

            commit("setToken", data.idToken);
            commit("clearMessage", null, { root: true });
         } catch (e: unknown) {
            const err = e as AxiosError<{ error?: { message?: string } }>;
            const message = err.response?.data?.error?.message;
            if (message) {
               dispatch(
                  "setMessage",
                  {
                     value: error(message),
                     type: "danger",
                  },
                  { root: true },
               );
            }

            throw new Error();
         }
      },

      async login({ commit, dispatch }, user: AuthUser) {
         try {
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`;

            const { data } = await axios.post<FirebaseAuthResponse>(url, {
               ...user,
               returnSecureToken: true,
            });

            commit("setToken", data.idToken);
            commit("clearMessage", null, { root: true });
         } catch (e: unknown) {
            const err = e as AxiosError<{ error?: { message?: string } }>;
            const message = err.response?.data?.error?.message;
            if (message) {
               dispatch(
                  "setMessage",
                  {
                     value: error(message),
                     type: "danger",
                  },
                  { root: true },
               );
            }

            throw new Error();
         }
      },
   },
};

export default authModule;
