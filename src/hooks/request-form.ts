import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { computed, ComputedRef, watch } from "vue";

import { Request } from "@/types/request";

type SubmitHandler = (values: Request) => void | Promise<void>;

export function useRequestForm(fn: SubmitHandler) {
   const { handleSubmit, isSubmitting, submitCount } = useForm<Request>({
      initialValues: {
         status: "active",
      },
   });

   const {
      value: name,
      errorMessage: nameError,
      handleBlur: nameBlur,
   } = useField<string>("name", yup.string().required("ФИО обязательно"));

   const {
      value: sum,
      errorMessage: sumError,
      handleBlur: sumBlur,
   } = useField<number>(
      "sum",
      yup.number().required("Сумма обязательна").min(0, "Минимальная сумма 0 рублей"),
   );

   const {
      value: tel,
      errorMessage: telError,
      handleBlur: telBlur,
   } = useField<string>("tel", yup.string().trim().required("Телефон обязателен"));

   const { value: status } = useField<Request["status"]>("status");

   const isTooManyAttempts: ComputedRef<boolean> = computed(() => submitCount.value >= 3);

   watch(isTooManyAttempts, (val) => {
      if (val) {
         setTimeout(() => {
            submitCount.value = 0;
         }, 3000);
      }
   });

   const onSubmit = handleSubmit(fn);

   return {
      name,
      nameError,
      nameBlur,
      sum,
      sumError,
      sumBlur,
      tel,
      telError,
      telBlur,
      status,
      onSubmit,
      isSubmitting,
      isTooManyAttempts,
   };
}
