<template>
   <div v-if="message" :class="['alert', message.type]">
      <p class="alert-title" v-if="title">{{ title }}</p>
      <p>{{ message.value }}</p>
      <span class="alert-close" @click="close">&times;</span>
   </div>
</template>

<script lang="ts">
import { TitleMap } from "../../types/components";
import { useTypedStore } from "../../store/useTypedStore";
import { Message } from "../../types/store";

import { computed, defineComponent } from "vue";

export default defineComponent({
   setup() {
      const store = useTypedStore();
      const message = computed<Message>(() => store.state.message);

      const TITLE_MAP: TitleMap = {
         danger: "Ошибка!",
         primary: "Успешно!",
         warning: "Внимание!",
      };
      const title = computed(() => (message.value ? TITLE_MAP[message.value.type] : ""));

      return { message, title, close: () => store.commit("clearMessage") };
   },
});
</script>
