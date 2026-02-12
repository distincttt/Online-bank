<template>
   <div class="question" @click="isOpen = !isOpen">
      <div class="question-title">{{ question.title }}</div>
      <div class="question-body" v-if="isOpen">{{ question.text }}</div>
   </div>
</template>

<script lang="ts">
import { Question } from "../../types/views";

import { ref, defineComponent, PropType } from "vue";

export default defineComponent({
   props: {
      question: {
         type: Object as PropType<Question>,
         required: true,
      },
   },
   setup() {
      const isOpen = ref<boolean>(false);

      return { isOpen };
   },
});
</script>
