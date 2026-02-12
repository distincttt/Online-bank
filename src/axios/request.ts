import axios from "axios";
import type { AxiosError } from "axios";

import router from "../router";

const requestAxios = axios.create({
   baseURL: process.env.VUE_APP_FB_URL,
});

requestAxios.interceptors.response.use(undefined, (error: AxiosError) => {
   const status = error.response?.status;

   if (status === 401) {
      router.push("/registration?message=auth");
   }

   return Promise.reject(error);
});

export default requestAxios;
