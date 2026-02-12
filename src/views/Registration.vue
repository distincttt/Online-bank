<template>
   <auth-form
      mode="registration"
      title="Создать аккаунт"
      submit-text="Создать аккаунт"
      limit-text="Вы превысили количество попыток регистрации. Попробуйте позже."
   >
      <p>
         Уже есть аккаунт?
         <router-link to="/auth">Войти</router-link>
      </p>
   </auth-form>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { defineComponent } from "vue";

import AuthForm from "../components/auth/AuthForm.vue";

import { error } from "../utils/error";

import { useTypedStore } from "../store/useTypedStore";
import { QueryMessage } from "../types/router";

export default defineComponent({
   components: { AuthForm },
   setup() {
      const route = useRoute();
      const store = useTypedStore();

      const message = route.query.message as QueryMessage;
      if (message) {
         store.dispatch("setMessage", { value: error(message), type: "warning" }, { root: true });
      }
   },
});
</script>
