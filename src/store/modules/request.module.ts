import { AxiosError } from "axios";
import { Module } from "vuex/types/index.js";

import store from "..";
import requestAxios from "../../axios/request";

import { Request, RequestsState } from "@/types/request";
import { RootState } from "@/types/store";

const requestModule: Module<RequestsState, RootState> = {
   namespaced: true,

   state: (): RequestsState => ({
      requests: [],
   }),

   getters: {
      requests: (state): Request[] => state.requests,
   },

   mutations: {
      setRequests(state, requests: Request[]) {
         state.requests = requests;
      },
      addRequest(state, request: Request) {
         state.requests.push(request);
      },
   },

   actions: {
      async createRequest({ commit, dispatch }, request: Request) {
         try {
            const token = store.getters["authModule/token"] as string;

            const { data } = await requestAxios.post<{ name: string }>(
               `/requests.json?auth=${token}`,
               request,
            );

            commit("addRequest", { ...request, id: data.name });

            dispatch(
               "setMessage",
               { value: "Заявка успешно создана", type: "primary" },
               { root: true },
            );
         } catch (e: unknown) {
            const err = e as AxiosError;
            dispatch("setMessage", { value: err.message, type: "danger" }, { root: true });
         }
      },

      async fetchRequests({ commit, dispatch }) {
         try {
            const token = store.getters["authModule/token"] as string;

            const { data } = await requestAxios.get<Record<string, Request> | null>(
               `/requests.json?auth=${token}`,
            );

            const requests: Request[] = data
               ? Object.keys(data).map((id) => ({ ...data[id], id }))
               : [];

            commit("setRequests", requests);
         } catch (e: unknown) {
            const err = e as AxiosError;
            dispatch("setMessage", { value: err.message, type: "danger" }, { root: true });
         }
      },

      async fetchRequestById(_, id: string): Promise<Request | undefined> {
         try {
            const token = store.getters["authModule/token"] as string;

            const { data } = await requestAxios.get<Request>(`/requests/${id}.json?auth=${token}`);

            return { ...data, id };
         } catch (e: unknown) {
            const err = e as AxiosError;
            store.dispatch("setMessage", { value: err.message, type: "danger" }, { root: true });
         }
      },

      async update({ dispatch }, request: Request & { id: string }) {
         try {
            const token = store.getters["authModule/token"] as string;

            await requestAxios.put(`/requests/${request.id}.json?auth=${token}`, request);

            dispatch(
               "setMessage",
               { value: "Заявка успешно обновлена", type: "primary" },
               { root: true },
            );
         } catch (e: unknown) {
            const err = e as AxiosError;
            dispatch("setMessage", { value: err.message, type: "danger" }, { root: true });
         }
      },

      async remove({ dispatch }, id: string) {
         try {
            const token = store.getters["authModule/token"] as string;

            await requestAxios.delete(`/requests/${id}.json?auth=${token}`);

            dispatch(
               "setMessage",
               { value: "Заявка успешно удалена", type: "primary" },
               { root: true },
            );
         } catch (e: unknown) {
            const err = e as AxiosError;
            dispatch("setMessage", { value: err.message, type: "danger" }, { root: true });
         }
      },
   },
};

export default requestModule;
