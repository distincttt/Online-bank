<template>
   <div class="sidebar" v-if="sidebar">
      <span class="sidebar-close" @click="close">&times;</span>

      <div class="sidebar-content">
         <p class="sidebar-content-text">
            Добро пожаловать в систему по учету заявок в нашем банке. Здесь вы найдете исчерпывающую
            информацию про систему и заявки
         </p>
      </div>
   </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { useTypedStore } from "../store/useTypedStore";

export default defineComponent({
   setup() {
      const store = useTypedStore();

      const sidebar = computed<boolean>(() => store.state.sidebar);
      const close = (): void => store.commit("closeSidebar");
      return {
         sidebar,
         close,
      };
   },
});
</script>
