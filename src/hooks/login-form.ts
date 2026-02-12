import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { computed, ComputedRef, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { AuthUser, AuthMode } from "@/types/auth";

export const useAuthForm = (mode: AuthMode = "login") => {
   const store = useStore();
   const router = useRouter();

   const { handleSubmit, isSubmitting, submitCount } = useForm<AuthUser>();

   const {
      value: email,
      errorMessage: eError,
      handleBlur: eBlur,
   } = useField<string>(
      "email",
      yup.string().required("Email обязателен").email("Введите корректный email"),
   );

   const PASSWORD_MIN_LENGTH: number = 6;

   const {
      value: password,
      errorMessage: pError,
      handleBlur: pBlur,
   } = useField<string>(
      "password",
      yup
         .string()
         .required("Пароль обязателен")
         .min(PASSWORD_MIN_LENGTH, `Минимум ${PASSWORD_MIN_LENGTH} символов`),
   );

   const isTooManyAttempts: ComputedRef<boolean> = computed(() => submitCount.value >= 3);

   watch(isTooManyAttempts, (val) => {
      if (val) {
         setTimeout(() => {
            submitCount.value = 0;
         }, 3000);
      }
   });

   const onSubmit = handleSubmit(async (values: AuthUser) => {
      try {
         await store.dispatch(`authModule/${mode}`, values);
         router.push("/");
      } catch (e) {}
   });

   return {
      email,
      eError,
      eBlur,
      password,
      pError,
      pBlur,
      onSubmit,
      isSubmitting,
      isTooManyAttempts,
   };
};
