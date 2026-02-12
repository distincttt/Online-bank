<template>
   <nav class="navbar">
      <h3>Online Bank</h3>
      <ul class="navbar-menu">
         <li><router-link to="/">Заявки</router-link></li>
         <li><router-link to="/help">Помощь</router-link></li>
         <li><a href="#" @click.prevent="openSidebar">Сообщение</a></li>
         <li><a href="#" @click.prevent="logout">Выход</a></li>
      </ul>
   </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import { useTypedStore } from "../store/useTypedStore";

export default defineComponent({
   setup() {
      const router = useRouter();
      const store = useTypedStore();
      return {
         logout: (): void => {
            store.commit("authModule/logout");
            router.push("/registration");
         },
         openSidebar: (): void => store.commit("openSidebar"),
      };
   },
});
</script>
