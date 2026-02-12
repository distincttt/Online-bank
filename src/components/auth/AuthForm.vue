<template>
   <form class="card" @submit.prevent="onSubmit">
      <h1>{{ title }}</h1>

      <div :class="['form-control', { invalid: eError }]">
         <label>Email</label>
         <input type="email" placeholder="Email" v-model="email" @blur="eBlur" />
         <small v-if="eError">{{ eError }}</small>
      </div>

      <div :class="['form-control', { invalid: pError }]">
         <label>Пароль</label>
         <input type="password" placeholder="Пароль" v-model="password" @blur="pBlur" />
         <small v-if="pError">{{ pError }}</small>
      </div>

      <button class="btn primary" type="submit" :disabled="isSubmitting || isTooManyAttempts">
         {{ submitText }}
      </button>

      <slot />

      <div class="text-danger" v-if="isTooManyAttempts">
         {{ limitText }}
      </div>
   </form>
</template>

<script>
import { useAuthForm } from "../../hooks/login-form";

export default {
   props: {
      title: String,
      submitText: String,
      limitText: String,
      mode: {
         type: String,
         required: true,
         validator: (v) => ["login", "registration"].includes(v),
      },
   },
   setup(props) {
      return {
         ...useAuthForm(props.mode),
      };
   },
};
</script>
