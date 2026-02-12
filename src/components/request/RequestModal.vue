<template>
   <form @submit.prevent="onSubmit">
      <div :class="['form-control', { invalid: nameError }]">
         <label for="name">ФИО</label>
         <input type="text" id="name" v-model="name" @blur="nameBlur" />
         <small v-if="nameError">{{ nameError }}</small>
      </div>
      <div :class="['form-control', { invalid: telError }]">
         <label for="tel"> Телефон</label>
         <input type="tel" id="tel" v-model="tel" @blur="telBlur" />
         <small v-if="telError">{{ telError }}</small>
      </div>
      <div :class="['form-control', { invalid: sumError }]">
         <label for="sum">Сумма</label
         ><input type="number" id="sum" v-model.number="sum" @blur="sumBlur" />
         <small v-if="sumError">{{ sumError }}</small>
      </div>
      <div class="form-control">
         <label for="status">Статус</label
         ><select id="status" v-model="status">
            <option value="pending">Выполняется</option>
            <option value="active">Активен</option>
            <option value="cancelled">Отменен</option>
            <option value="done">Завершён</option>
         </select>
      </div>

      <button class="btn primary" type="submit" :disabled="isSubmitting || isTooManyAttempts">
         Создать заявку
      </button>

      <div class="text-danger" v-if="isTooManyAttempts">
         Вы превысили количество попыток входа. Попробуйте позже.
      </div>
   </form>
</template>

<script lang="ts">
import { useRequestForm } from "../../hooks/request-form";

import { Request } from "../../types/request";
import { useTypedStore } from "../../store/useTypedStore";

import { defineComponent } from "vue";

export default defineComponent({
   emits: ["created"],
   setup(_, { emit }) {
      const store = useTypedStore();

      const submit = async (data: Request) => {
         await store.dispatch("requestModule/createRequest", data);
         emit("created");
      };

      return {
         ...useRequestForm(submit),
      };
   },
});
</script>
