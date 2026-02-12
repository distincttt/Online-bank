<template>
   <component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import { useRoute } from "vue-router";

import AuthLayout from "./layout/AuthLayout.vue";
import MainLayout from "./layout/MainLayout.vue";
import { computed } from "vue";

export default {
   setup() {
      const route = useRoute();

      return {
         layout: computed(() => route.meta.layout),
      };
   },
   components: {
      MainLayout,
      AuthLayout,
   },
};
</script>
