<template>
   <auth-form
      mode="login"
      title="Войти в систему"
      submit-text="Войти"
      limit-text="Вы превысили количество попыток входа. Попробуйте позже."
   />
</template>

<script>
import AuthForm from "../components/auth/AuthForm.vue";

export default {
   components: { AuthForm },
};
</script>
