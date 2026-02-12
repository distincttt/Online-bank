<template>
   <span :class="['badge', className]">{{ text }}</span>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import { RequestStatus } from "../../types/request";

export default defineComponent({
   name: "AppStatus",
   props: {
      type: {
         type: String as () => RequestStatus,
         required: true,
         validator: (value: string) => ["active", "cancelled", "done", "pending"].includes(value),
      },
   },
   setup(props) {
      const classesMap: Record<RequestStatus, string> = {
         active: "primary",
         cancelled: "danger",
         done: "primary",
         pending: "warning",
      };

      const textMap: Record<RequestStatus, string> = {
         active: "Активен",
         cancelled: "Отменен",
         done: "Завершен",
         pending: "Выполняется",
      };

      const className = ref(classesMap[props.type]);
      const text = ref(textMap[props.type]);

      watch(
         () => props.type,
         (newType: RequestStatus) => {
            className.value = classesMap[newType];
            text.value = textMap[newType];
         },
      );

      // Приводим возвращаемый объект к типу
      return { className, text } as const;
   },
});
</script>
