<template>
   <app-loader v-if="loading" />
   <app-page v-else title="Список заявок">
      <template #header>
         <button class="btn primary" @click="modal = true">Создать</button>
      </template>

      <request-filter v-model="filter" />
      <request-table :requests="requests" />

      <teleport to="body"
         ><app-modal v-if="modal" title="Создать заявку" @close="modal = false">
            <request-modal @created="modal = false"
         /></app-modal>
         ></teleport
      >
   </app-page>
</template>

<script lang="ts">
import { computed, ref, onMounted, defineComponent } from "vue";

import { Request, RequestFilterType } from "../types/request";
import { useTypedStore } from "../store/useTypedStore";

import RequestTable from "../components/request/RequestTable.vue";
import AppPage from "../components/ui/AppPage.vue";
import AppModal from "../components/ui/AppModal.vue";
import RequestModal from "../components/request/RequestModal.vue";
import AppLoader from "../components/ui/AppLoader.vue";
import RequestFilter from "../components/request/RequestFilter.vue";

export default defineComponent({
   components: {
      AppPage,
      RequestTable,
      AppModal,
      RequestModal,
      AppLoader,
      RequestFilter,
   },
   setup() {
      const modal = ref(false);
      const loading = ref(false);
      const filter = ref<RequestFilterType>({});

      const store = useTypedStore();

      onMounted(async () => {
         loading.value = true;
         await store.dispatch("requestModule/fetchRequests");
         loading.value = false;
      });

      const requests = computed<Request[]>(() => {
         const all = store.getters["requestModule/requests"] as Request[];
         return all
            .filter((r) => (filter.value.name ? r.name.includes(filter.value.name) : true))
            .filter((r) => (filter.value.status ? r.status === filter.value.status : true));
      });

      return {
         modal,
         requests,
         loading,
         filter,
      };
   },
});
</script>
