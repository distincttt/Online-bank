<template>
   <app-page back title="Помощь">
      <question-item v-for="q in questions" :key="q.title" :question="q"></question-item>
   </app-page>
</template>

<script lang="ts">
import AppPage from "../components/ui/AppPage.vue";
import QuestionItem from "../components/question/QuestionItem.vue";

import { Questions } from "../types/views";

import { defineComponent } from "vue";

export default defineComponent({
   components: { AppPage, QuestionItem },
   setup() {
      const questions: Questions = [
         {
            title: "Что есть в данной системе?",
            text: "Тут есть все, для того, чтобы смотреть, какие заявки человек добавлял",
         },
         {
            title: "Как тут работает авторизация?",
            text: "Все реализовано через Firebase",
         },
      ];

      return { questions };
   },
});
</script>
