<template>
   <app-loader v-if="loading"></app-loader>
   <app-page back title="Заявка" v-else-if="request">
      <p><strong>Имя владельца</strong>: {{ request.name }}</p>
      <p><strong>Телефон</strong>: {{ request.tel }}</p>
      <p><strong>Сумма</strong>: {{ currency(request.sum) }}</p>
      <p><strong>Статус</strong>: <app-status :type="request.status" /></p>

      <div class="form-control">
         <label for="status">Статус</label>
         <select id="status" v-model="status">
            <option value="done">Завершен</option>
            <option value="cancelled">Отменен</option>
            <option value="active">Активен</option>
            <option value="pending">Выполняется</option>
         </select>
      </div>

      <button class="btn danger" @click="remove">Удалить</button>
      <button class="btn" @click="update" v-if="hasChanges">Обновить</button>
   </app-page>
   <h3 v-else class="text-center text-white">Заявки с ID = {{ $route.params.id }} нет.</h3>
</template>

<script lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import AppPage from "../components/ui/AppPage.vue";
import AppLoader from "../components/ui/AppLoader.vue";
import AppStatus from "../components/ui/AppStatus.vue";

import { currency } from "../utils/currency";
import type { Request, RequestStatus } from "../types/request";
import { useTypedStore } from "../store/useTypedStore";

export default {
   components: { AppPage, AppLoader, AppStatus },

   setup() {
      const route = useRoute();
      const router = useRouter();
      const store = useTypedStore();

      // Типизируем состояния
      const status = ref<RequestStatus | undefined>(undefined);
      const loading = ref<boolean>(true);
      const request = ref<Request | null>(null);

      onMounted(async () => {
         loading.value = true;

         // route.params.id может быть string | string[] | undefined
         const id = route.params.id as string;
         request.value = await store.dispatch("requestModule/fetchRequestById", id);

         status.value = request.value?.status;
         loading.value = false;
      });

      const hasChanges = computed<boolean>(() => request.value?.status !== status.value);

      const remove = async () => {
         const id = route.params.id as string;
         await store.dispatch("requestModule/remove", id);
         router.push("/");
      };

      const update = async () => {
         if (!request.value) return;

         const id = route.params.id as string;
         const data: Request = { ...request.value, status: status.value ?? "active", id };
         await store.dispatch("requestModule/update", data);

         request.value.status = status.value!;
      };

      return { loading, request, currency, remove, update, status, hasChanges };
   },
};
</script>
