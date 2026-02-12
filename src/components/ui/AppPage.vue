<template>
   <div class="breadcrumbs" v-if="back">
      <router-link to="/" class="text-white">Назад</router-link>
   </div>
   <div class="card">
      <h1 class="card-title">{{ title }}<slot name="header" /></h1>

      <slot />
   </div>
</template>

<script>
import { onMounted } from "vue";

export default {
   props: {
      title: {
         type: String,
         required: true,
      },
      back: {
         type: Boolean,
         default: false,
      },
   },
   setup(props) {
      onMounted(() => {
         document.title = `${props.title} | Клон Банка`;
      });
   },
};
</script>
