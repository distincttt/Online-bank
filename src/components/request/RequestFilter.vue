<template>
   <div class="filter">
      <div class="form-control">
         <input type="text" placeholder="Начните писать имя" v-model="name" />
      </div>
      <div class="form-control">
         <select v-model="status">
            <option disabled selected>Выберите статус</option>
            <option value="done">Завершен</option>
            <option value="cancelled">Отменен</option>
            <option value="active">Активен</option>
            <option value="pending">Выполняется</option>
         </select>
      </div>
      <button class="btn warning" v-if="isActive" @click="reset">Очистить</button>
   </div>
</template>

<script lang="ts">
import { RequestFilterType } from "../../types/request";

import { ref, watch, computed, defineComponent, PropType } from "vue";

export default defineComponent({
   props: {
      modelValue: {
         type: Object as PropType<RequestFilterType>,
         default: () => ({}),
      },
   },
   emits: ["update:modelValue"],
   setup(props, { emit }) {
      const { name: initialName = "", status: initialStatus } =
         props.modelValue as RequestFilterType;

      const name = ref<string>(initialName);
      const status = ref<RequestFilterType["status"]>(initialStatus);

      watch([name, status], ([newName, newStatus]) => {
         emit("update:modelValue", {
            name: newName,
            status: newStatus,
         });
      });

      const isActive = computed(() => !!name.value || !!status.value);

      const reset = () => {
         name.value = "";
         status.value = undefined;
      };

      return { name, status, isActive, reset };
   },
});
</script>

<style scoped></style>
